const orb = document.querySelector('#voice-orb');
const stage = document.querySelector('.voice-stage');
const stateLabel = document.querySelector('#voice-state');
const helpLabel = document.querySelector('#voice-help');
const transcriptWindow = document.querySelector('#transcript-window');
const textForm = document.querySelector('#voice-text-form');
const textInput = document.querySelector('#voice-text-input');
const topicButtons = document.querySelectorAll('[data-question]');
const RATE_API = 'https://xaus.com/api/v1/spot?currency=PKR&unit=gram&compact=1';
const SPOT_API = 'https://api.gold-api.com/price/XAU';
const FX_API = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
const TOLA_IN_GRAMS = 11.6638038;
const TROY_OUNCE_IN_GRAMS = 31.1034768;
let recognition;
let listening = false;
let interimLine;

function setVoiceState(nextState, help) {
  stateLabel.textContent = nextState;
  helpLabel.textContent = help;
  const active = nextState === 'Listening…';
  listening = active;
  orb.classList.toggle('listening', active);
  stage.classList.toggle('listening', active);
  orb.setAttribute('aria-pressed', String(active));
  orb.setAttribute('aria-label', active ? 'Stop voice conversation' : 'Start voice conversation');
}

function addTranscript(role, message, transient = false) {
  if (transient && interimLine) interimLine.remove();
  const line = document.createElement('div');
  line.className = `transcript-line ${role}${transient ? ' interim' : ''}`;
  const label = document.createElement('span');
  label.textContent = role === 'bot' ? 'ALM' : 'YOU';
  const text = document.createElement('p');
  text.textContent = message;
  line.append(label, text);
  transcriptWindow.appendChild(line);
  transcriptWindow.scrollTop = transcriptWindow.scrollHeight;
  if (transient) interimLine = line;
  return line;
}

function speak(message) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'en-PK';
  utterance.rate = 1.05;
  utterance.pitch = 1.03;
  window.speechSynthesis.speak(utterance);
}

// Warm up the speech engine on the first tap so the first spoken reply starts instantly.
function warmUpSpeech() {
  window.removeEventListener('pointerdown', warmUpSpeech);
  if (!('speechSynthesis' in window)) return;
  const warm = new SpeechSynthesisUtterance(' ');
  warm.volume = 0;
  window.speechSynthesis.speak(warm);
}
window.addEventListener('pointerdown', warmUpSpeech);

function formatPKR(amount) {
  return `PKR ${Math.round(amount / 100) * 100}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

let rateCache = null;
let rateFetch = null;

function setRateCache(gram24k) {
  const rate24 = gram24k * TOLA_IN_GRAMS;
  rateCache = { rate21: rate24 * 21 / 24, rate24, at: Date.now() };
  return rateCache;
}

async function fetchGoldRate() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const response = await fetch(RATE_API, { headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new Error('Rate unavailable');
    const data = await response.json();
    const gram24k = Number(data?.xau?.price);
    if (!Number.isFinite(gram24k) || gram24k <= 0) throw new Error('Invalid rate');
    return setRateCache(gram24k);
  } catch (_) {
    // Backup source: live USD gold spot converted to PKR.
    const [spotResponse, fxResponse] = await Promise.all([
      fetch(SPOT_API, { headers: { Accept: 'application/json' } }),
      fetch(FX_API, { headers: { Accept: 'application/json' } })
    ]);
    if (!spotResponse.ok || !fxResponse.ok) throw new Error('Rate unavailable');
    const spot = await spotResponse.json();
    const fx = await fxResponse.json();
    const gram24k = (Number(spot?.price) / TROY_OUNCE_IN_GRAMS) * Number(fx?.usd?.pkr);
    if (!Number.isFinite(gram24k) || gram24k <= 0) throw new Error('Invalid rate');
    return setRateCache(gram24k);
  } finally {
    clearTimeout(timeout);
  }
}

// Prefetch the gold rate the moment the page opens, so rate answers are instant.
rateFetch = fetchGoldRate().catch(() => null);

function rateMessage(rate21, rate24) {
  return `Today’s indicative 21K rate is ${formatPKR(rate21)} per tola. The 24K rate is ${formatPKR(rate24)} per tola. Rates refresh daily.`;
}

async function currentGoldRate() {
  if (rateCache) {
    if (Date.now() - rateCache.at > 5 * 60 * 1000) rateFetch = fetchGoldRate().catch(() => null);
    return rateMessage(rateCache.rate21, rateCache.rate24);
  }
  const fresh = await rateFetch;
  if (fresh) return rateMessage(fresh.rate21, fresh.rate24);
  rateFetch = fetchGoldRate().catch(() => null);
  return 'Our live gold-rate feed is temporarily unavailable. Please check the Today’s Gold Rate section on the collection page again shortly.';
}

async function answer(question) {
  const query = question.toLowerCase();
  if (query.includes('rate') || query.includes('gold') || query.includes('21k') || query.includes('24k') || query.includes('tola')) return currentGoldRate();
  if (query.includes('bridal') || query.includes('wedding') || query.includes('nath') || query.includes('maang') || query.includes('haathphool')) return 'Our bridal collection includes kundan chokers, polki sets, maang tikka, nath and haathphool designs, all in 21K gold. Return to the collection page and choose Bridal to explore the full edit.';
  if (query.includes('price') || query.includes('cost') || query.includes('how much')) return 'All our jewellery is priced by weight at the day’s 21K gold rate, so figures move with the market. Ask me for any piece’s weight, and message us on WhatsApp from the collection page for today’s exact price.';
  if (query.includes('ring') || query.includes('necklace') || query.includes('earring') || query.includes('jhumka') || query.includes('bangle') || query.includes('bracelet')) return 'Every piece in our edit is crafted in 21K gold and priced by weight at the day’s rate — message us on WhatsApp for today’s figure. Return to the collection page to filter rings, necklaces, earrings, bangles, or bridal jewellery.';
  if (query.includes('custom') || query.includes('bespoke') || query.includes('design')) return 'Our atelier creates one-of-one jewellery from your story, sketch, or inspiration. Use the bespoke section on our collection page to request a private consultation.';
  if (query.includes('showroom') || query.includes('location') || query.includes('address') || query.includes('visit')) return 'Our showroom is at Al Rehman Square Mall, Shop 8, Al Rehman Garden Phase 2, Sharaqpur, Lahore. The collection page footer has a Get Directions link.';
  if (query.includes('contact') || query.includes('call') || query.includes('email') || query.includes('whatsapp')) return 'You can call us at plus nine two, three one one, four eight one, seven eight eight two, or email Alif Laam Meem Jewellers at Gmail dot com. Our WhatsApp button is also available on the collection page.';
  if (query.includes('hello') || query.includes('salam') || query.includes('assalam')) return 'Wa alaikum assalam. I am here to help you find a piece, learn about our 21K gold, or plan a private visit.';
  return 'I can help with 21K jewellery, piece weights, live gold rates, bridal pieces, bespoke designs, and showroom visits. What would you like to know?';
}

async function respond(question, useVoice = false) {
  addTranscript('user', question);
  const pending = answer(question);
  let thinking = null;
  const thinkingTimer = setTimeout(() => { thinking = addTranscript('bot', 'One moment, please…', true); }, 110);
  const reply = await pending;
  clearTimeout(thinkingTimer);
  if (thinking) thinking.remove();
  interimLine = null;
  addTranscript('bot', reply);
  if (useVoice) speak(reply);
}

function startVoice() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    setVoiceState('Voice unavailable', 'Type your question below instead');
    addTranscript('bot', 'Voice input is not supported in this browser, but you can still type your question below.');
    return;
  }
  if (listening && recognition) {
    recognition.stop();
    return;
  }
  window.speechSynthesis?.cancel();
  recognition = new Recognition();
  recognition.lang = 'en-PK';
  recognition.continuous = false;
  recognition.interimResults = true;
  let completed = false;
  setVoiceState('Listening…', 'Speak naturally, then pause');

  recognition.onresult = event => {
    let transcript = '';
    for (let index = event.resultIndex; index < event.results.length; index += 1) transcript += event.results[index][0].transcript;
    if (interimLine) interimLine.querySelector('p').textContent = transcript.trim();
    else if (transcript.trim()) addTranscript('user', transcript.trim(), true);
    const result = event.results[event.results.length - 1];
    if (result.isFinal && transcript.trim() && !completed) {
      completed = true;
      interimLine?.remove();
      interimLine = null;
      respond(transcript.trim(), true);
    }
  };
  recognition.onerror = event => {
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      setVoiceState('Microphone blocked', 'Allow microphone access and try again');
      addTranscript('bot', 'Please allow microphone access in your browser settings, then tap the orb again.');
    } else if (event.error !== 'aborted' && event.error !== 'no-speech') {
      setVoiceState('Try again', 'The microphone could not hear that clearly');
    }
  };
  recognition.onend = () => {
    if (!stateLabel.textContent.includes('blocked')) setVoiceState('Voice ready', 'Tap the orb and allow microphone access');
  };
  try { recognition.start(); } catch (_) { setVoiceState('Voice ready', 'Tap the orb to try again'); }
}

orb.addEventListener('click', startVoice);

// Open straight into the live experience: start listening as soon as the page loads.
if (window.SpeechRecognition || window.webkitSpeechRecognition) startVoice();

textForm.addEventListener('submit', event => {
  event.preventDefault();
  const question = textInput.value.trim();
  if (!question) return;
  textInput.value = '';
  respond(question, false);
});
topicButtons.forEach(button => button.addEventListener('click', () => respond(button.dataset.question, false)));
