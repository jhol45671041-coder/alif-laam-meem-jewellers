const products = [
  { id: 1, name: 'Sairah Solitaire Ring', category: 'Rings', type: 'Diamond ring', price: 397000, weight: 4.6, image: 'public/images/ring-solitaire.png', tag: 'NEW', description: 'A softly sculpted solitaire, designed to feel as natural as it does remarkable. Hand-finished in warm 21K gold.' },
  { id: 2, name: 'Riva Emerald Collar', category: 'Necklaces', type: 'Gold & emerald necklace', price: 820800, weight: 34.8, image: 'public/images/necklace-riva.png', tag: 'SIGNATURE', description: 'Emerald touches meet a delicate gold collar in a piece that brings instant occasion to the everyday.' },
  { id: 3, name: 'Mira Diamond Drops', category: 'Earrings', type: 'Diamond earrings', price: 256300, weight: 10.4, image: 'public/images/earrings-mira.png', tag: '', description: 'Fluid drops of light, individually set with certified diamonds and made to move beautifully with you.' },
  { id: 4, name: 'Noor Twisted Bangle', category: 'Bangles', type: 'Gold bangle', price: 298800, weight: 21.8, image: 'public/images/bangle-noor.png', tag: 'BESTSELLER', description: 'A graceful twist in 21K gold, peppered with just enough sparkle. A future favourite, from day one.' },
  { id: 9, name: 'Meher Kundan Choker', category: 'Necklaces', type: 'Kundan necklace', price: 958100, weight: 58.6, image: 'public/images/kundan-meher.png', tag: 'NEW', description: 'A celebration of old-world kundan work, ruby tones and luminous pearl drops — created to make an entrance.' },
  { id: 10, name: 'Zareen Pearl Jhumkas', category: 'Earrings', type: 'Gold jhumka earrings', price: 324300, weight: 13.2, image: 'public/images/jhumka-zareen.png', tag: 'BESTSELLER', description: 'Ornate gold domes, hand-finished with a joyful fringe of pearls. A classic that never feels ordinary.' },
  { id: 11, name: 'Gulbahar Polki Set', category: 'Bridal', type: 'Polki bridal set', price: 1547700, weight: 96.4, image: 'public/images/polki-gulbahar.png', tag: 'BRIDAL 2026', description: 'A regal polki and emerald set that brings the softness, light and splendour of a garden in bloom.' },
  { id: 12, name: 'Hoor Pearl Bracelet', category: 'Bangles', type: 'Gold & pearl bracelet', price: 245200, weight: 9.6, image: 'public/images/bracelet-hoor.png', tag: '', description: 'A quietly radiant line of gold, diamond and pearls, made for the wrist you see every day.' },
  { id: 13, name: 'Amaan Medallion', category: 'Necklaces', type: 'Gold pendant', price: 204700, weight: 5.8, image: 'public/images/pendant-amaan.png', tag: 'NEW', description: 'A small golden talisman with an emerald heart, designed for daily closeness and personal meaning.' },
  { id: 14, name: 'Saba Ruby Stacks', category: 'Rings', type: 'Gold stackable rings', price: 280100, weight: 12.6, image: 'public/images/ring-saba.png', tag: '', description: 'Three fine bands of gold, diamond light and ruby colour. Wear one, two or the whole story.' },
  { id: 15, name: 'Alara Maang Tikka', category: 'Bridal', type: 'Kundan head jewellery', price: 417100, weight: 11.0, image: 'public/images/maangtikka-alara.png', tag: 'NEW', description: 'A traditional bridal maang tikka, reimagined with refined kundan work and a gentle fall of pearls.' },
  { id: 16, name: 'Nur Ruby Kada', category: 'Bangles', type: 'Gold & ruby kada', price: 468300, weight: 32.4, image: 'public/images/kada-nur.png', tag: 'NEW', description: 'A bold sculpted kada with ruby warmth and a hand-carved floral rhythm. Designed to be treasured in the everyday.' },
  { id: 17, name: 'Firdaus Long Haar', category: 'Necklaces', type: 'Antique gold haar', price: 917900, weight: 64.2, image: 'public/images/haar-firdaus.png', tag: 'SIGNATURE', description: 'An intricate long haar in antique gold, inspired by archival floral motifs and made for moments of ceremony.' },
  { id: 18, name: 'Pari Peacock Chandeliers', category: 'Earrings', type: 'Gold chandelier earrings', price: 376500, weight: 15.8, image: 'public/images/earrings-pari.png', tag: '', description: 'A graceful peacock-inspired pair, with lively ruby and emerald colour drawn through intricate goldwork.' },
  { id: 19, name: 'Yaara Diamond Line', category: 'Bangles', type: 'Diamond tennis bracelet', price: 521300, weight: 12.2, image: 'public/images/bracelet-yaara.png', tag: 'NEW', description: 'A continuous, easy line of certified diamonds for a little brilliance that belongs with everything.' },
  { id: 20, name: 'Lune Moonstone Ring', category: 'Rings', type: 'Moonstone & diamond ring', price: 317200, weight: 5.2, image: 'public/images/ring-moonstone.png', tag: '', description: 'A moonstone that catches the light in its own quiet way, set with a delicate diamond halo in yellow gold.' },
  { id: 21, name: 'Isha Modern Mangalsutra', category: 'Necklaces', type: 'Gold mangalsutra', price: 364800, weight: 13.4, image: 'public/images/mangalsutra-isha.png', tag: 'NEW', description: 'A refined mangalsutra for daily wear, balancing traditional black beads with a fine diamond-set pendant.' },
  { id: 22, name: 'Zoya Bridal Nath', category: 'Bridal', type: 'Gold & pearl nath', price: 228800, weight: 6.8, image: 'public/images/nath-zoya.png', tag: '', description: 'A beautifully delicate bridal nath with ruby colour, a pearl touch and a fine golden chain.' },
  { id: 23, name: 'Anaya Kundan Haathphool', category: 'Bridal', type: 'Bridal hand jewellery', price: 628100, weight: 27.6, image: 'public/images/haathphool-anaya.png', tag: 'BRIDAL 2026', description: 'Fine floral kundan work meets pearl drops in a hand harness made for hennaed hands and joyful celebrations.' },
  { id: 24, name: 'Dastaan Navratna Ring', category: 'Rings', type: 'Gold gemstone ring', price: 320400, weight: 7.4, image: 'public/images/ring-dastaan.png', tag: 'NEW', description: 'Nine vivid stones, one richly detailed gold setting and a story of colour made to be worn every day.' },
  { id: 25, name: 'Noura Rose Cut Drops', category: 'Earrings', type: 'Diamond & pearl earrings', price: 298700, weight: 11.6, image: 'public/images/earrings-noura.png', tag: '', description: 'Rose cut diamonds and soft pearl drops turn a classic silhouette into something luminously modern.' },
  { id: 26, name: 'Sultana Antique Choker', category: 'Necklaces', type: 'Antique gold choker', price: 1034500, weight: 72.5, image: 'public/images/choker-sultana.png', tag: 'SIGNATURE', description: 'A richly worked heritage choker, layered with ruby colour and a fringe of hand-set pearls.' },
  { id: 27, name: 'Samaa Diamond Cuff', category: 'Bangles', type: 'Gold diamond cuff', price: 544900, weight: 24.8, image: 'public/images/cuff-samaa.png', tag: 'NEW', description: 'A contemporary open cuff in softly sculpted gold, lit at each end by a line of pavé diamonds.' },
  { id: 28, name: 'Roshni Pearl Lariat', category: 'Necklaces', type: 'Gold pearl necklace', price: 325100, weight: 14.8, image: 'public/images/lariat-roshni.png', tag: '', description: 'A graceful string of gold and pearls that layers beautifully or quietly stands on its own.' },
  { id: 29, name: 'Gul Kundan Studs', category: 'Earrings', type: 'Kundan flower studs', price: 175500, weight: 4.2, image: 'public/images/studs-gul.png', tag: 'NEW', description: 'Small kundan blooms with a ruby heart, imagined as a bright everyday touch of tradition.' },
  { id: 30, name: 'Amara Kundan Matha Patti', category: 'Bridal', type: 'Bridal head jewellery', price: 690600, weight: 38.6, image: 'public/images/mathapatti-amara.png', tag: 'BRIDAL 2026', description: 'A luminous kundan matha patti with a gentle pearl fall, crafted for a bridal look that feels timeless.' },
  { id: 31, name: 'Sitarah Charm Bracelet', category: 'Bangles', type: 'Gold diamond bracelet', price: 299100, weight: 10.2, image: 'public/images/bracelet-sitarah.png', tag: '', description: 'Little diamond stars dance along a fine gold chain in this joyful piece of everyday light.' },
  { id: 5, name: 'Dilruba Choker', category: 'Bridal', type: 'Bridal necklace', price: 1098800, weight: 68.3, image: 'public/images/hero-bridal.png', tag: 'BRIDAL 2026', description: 'An opulent bridal choker layered in gold, diamonds, and all the possibility of a new beginning.' }
];

const state = { filter: 'All', showAll: false, cart: [], currentProduct: null };
const fmt = new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', currencyDisplay: 'code', maximumFractionDigits: 0 });
const grid = document.querySelector('#products-grid');
const cartDrawer = document.querySelector('.cart-drawer');
const overlay = document.querySelector('#overlay');
const toast = document.querySelector('.toast');
const GOLD_RATE_API = 'https://xaus.com/api/v1/spot?currency=PKR&unit=gram&compact=1';
const GOLD_RATE_CACHE_KEY = 'alm-pkr-gold-rate';
const TOLA_IN_GRAMS = 11.6638038;

function formatWeight(product) {
  const grams = Number(product.weight);
  if (!Number.isFinite(grams) || grams <= 0) return '';
  return `${grams.toFixed(1)} g (${(grams / TOLA_IN_GRAMS).toFixed(2)} tola)`;
}
const cursorGlow = document.querySelector('.cursor-glow');
let toastTimer;

function enableMouseMotion() {
  if (!window.matchMedia('(pointer: fine)').matches || !cursorGlow) return;

  let frameId = null;
  let latestPointer = null;
  window.addEventListener('pointermove', event => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    latestPointer = event;
    if (frameId) return;
    frameId = window.requestAnimationFrame(() => {
      cursorGlow.style.setProperty('--cursor-x', `${latestPointer.clientX}px`);
      cursorGlow.style.setProperty('--cursor-y', `${latestPointer.clientY}px`);
      cursorGlow.classList.add('active');
      frameId = null;
    });
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));

  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');
  if (!hero || !heroImage) return;
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 8;
    heroImage.style.transform = `scale(1.055) translate(${x}px, ${y}px)`;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { heroImage.style.transform = ''; });
}

function pakistanDayKey(date = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Karachi' }).format(date);
}

function formatRateTimestamp(timestamp) {
  return new Intl.DateTimeFormat('en-PK', {
    timeZone: 'Asia/Karachi', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true
  }).format(new Date(timestamp));
}

function formatPkrRate(amount) {
  return `₨${Math.round(amount).toLocaleString('en-PK')}`;
}

function applyGoldRate(rate, isLive = true) {
  document.querySelector('[data-rate-value="21k"]').innerHTML = `${formatPkrRate(rate.rate21)}<small>/ tola</small>`;
  document.querySelector('[data-rate-value="24k"]').innerHTML = `${formatPkrRate(rate.rate24)}<small>/ tola</small>`;
  document.querySelectorAll('[data-rate-status]').forEach(status => {
    status.innerHTML = isLive ? '↻ <i>Live market reference</i>' : '↻ <i>Last saved reference</i>';
  });
  document.querySelector('#gold-rate-updated').textContent = isLive
    ? `Updated ${formatRateTimestamp(rate.timestamp)} PKT · Refreshes automatically every day`
    : `Last saved ${formatRateTimestamp(rate.timestamp)} PKT · Refreshing when available`;
}

async function refreshGoldRates() {
  let cachedRate;
  try { cachedRate = JSON.parse(localStorage.getItem(GOLD_RATE_CACHE_KEY)); } catch (_) { /* ignore unavailable storage */ }
  if (cachedRate?.day === pakistanDayKey() && cachedRate.rate21 && cachedRate.rate24) {
    applyGoldRate(cachedRate);
    return;
  }

  try {
    const response = await fetch(GOLD_RATE_API, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Gold rate response: ${response.status}`);
    const data = await response.json();
    const gram24k = Number(data?.xau?.price);
    if (!Number.isFinite(gram24k) || gram24k <= 0) throw new Error('Gold rate data was incomplete');

    const rate = {
      rate24: Math.round((gram24k * TOLA_IN_GRAMS) / 100) * 100,
      rate21: Math.round((gram24k * (21 / 24) * TOLA_IN_GRAMS) / 100) * 100,
      timestamp: data.updated_at || data?.data_state?.as_of || new Date().toISOString(),
      day: pakistanDayKey()
    };
    localStorage.setItem(GOLD_RATE_CACHE_KEY, JSON.stringify(rate));
    applyGoldRate(rate);
  } catch (_) {
    if (cachedRate?.rate21 && cachedRate?.rate24) applyGoldRate(cachedRate, false);
    else document.querySelector('#gold-rate-updated').textContent = 'Latest market data is temporarily unavailable — please refresh shortly.';
  }
}

const conciergePanel = document.querySelector('.concierge-panel');
const conciergeLauncher = document.querySelector('.concierge-launcher');
const conciergeMessages = document.querySelector('.concierge-messages');
const conciergeForm = document.querySelector('.concierge-form');
const conciergeInput = document.querySelector('#concierge-input');
const voiceTrigger = document.querySelector('.voice-trigger');
const conciergeStatus = document.querySelector('#concierge-status');
let voiceRecognition;
let isVoiceListening = false;

function openConcierge() {
  conciergePanel.classList.add('active');
  conciergePanel.setAttribute('aria-hidden', 'false');
  conciergeLauncher.setAttribute('aria-expanded', 'true');
  setTimeout(() => conciergeInput.focus(), 200);
}

function closeConcierge() {
  if (isVoiceListening && voiceRecognition) voiceRecognition.stop();
  conciergePanel.classList.remove('active');
  conciergePanel.setAttribute('aria-hidden', 'true');
  conciergeLauncher.setAttribute('aria-expanded', 'false');
}

function appendConciergeMessage(role, message, isTyping = false) {
  const bubble = document.createElement('div');
  bubble.className = `concierge-message ${role}${isTyping ? ' typing' : ''}`;
  bubble.textContent = message;
  conciergeMessages.appendChild(bubble);
  conciergeMessages.scrollTop = conciergeMessages.scrollHeight;
  return bubble;
}

function updateVoiceStatus(listening, label = 'Voice ready') {
  isVoiceListening = listening;
  voiceTrigger.classList.toggle('listening', listening);
  voiceTrigger.setAttribute('aria-pressed', String(listening));
  voiceTrigger.querySelector('strong').textContent = listening ? 'Listening…' : 'Talk to ALM';
  voiceTrigger.querySelector('small').textContent = listening ? 'Speak naturally, then pause' : 'Tap and ask a question';
  conciergeStatus.innerHTML = `<i></i> ${label}`;
}

function speakConciergeReply(message) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const spoken = new SpeechSynthesisUtterance(message);
  spoken.lang = 'en-PK';
  spoken.rate = 1.05;
  spoken.pitch = 1.03;
  window.speechSynthesis.speak(spoken);
}

function beginVoiceConversation() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    appendConciergeMessage('bot', 'Voice input is not available in this browser. You can still type your question below.');
    return;
  }
  if (isVoiceListening && voiceRecognition) {
    voiceRecognition.stop();
    return;
  }

  voiceRecognition = new Recognition();
  voiceRecognition.lang = 'en-PK';
  voiceRecognition.continuous = false;
  voiceRecognition.interimResults = true;
  let hasFinalAnswer = false;
  updateVoiceStatus(true, 'Listening live');

  voiceRecognition.onresult = event => {
    let transcript = '';
    for (let index = event.resultIndex; index < event.results.length; index += 1) transcript += event.results[index][0].transcript;
    conciergeInput.value = transcript.trim();
    const latest = event.results[event.results.length - 1];
    if (latest.isFinal && transcript.trim() && !hasFinalAnswer) {
      hasFinalAnswer = true;
      sendConciergeMessage(transcript.trim(), true);
      conciergeInput.value = '';
    }
  };
  voiceRecognition.onerror = event => {
    if (event.error !== 'aborted' && event.error !== 'no-speech') appendConciergeMessage('bot', 'I could not hear that clearly. Please try the microphone again or type your question.');
  };
  voiceRecognition.onend = () => updateVoiceStatus(false, 'Voice ready');
  voiceRecognition.start();
}

function conciergeReply(question) {
  const query = question.toLowerCase().trim();
  const categoryIntents = [
    { words: ['bridal', 'wedding', 'nath', 'maang', 'haathphool'], category: 'Bridal', label: 'bridal' },
    { words: ['ring', 'rings'], category: 'Rings', label: 'rings' },
    { words: ['necklace', 'choker', 'haar', 'pendant', 'mangalsutra'], category: 'Necklaces', label: 'necklaces' },
    { words: ['earring', 'earrings', 'jhumka', 'stud'], category: 'Earrings', label: 'earrings' },
    { words: ['bangle', 'bangles', 'bracelet', 'kada', 'cuff'], category: 'Bangles', label: 'bangles and bracelets' }
  ];
  const categoryMatch = categoryIntents.find(intent => intent.words.some(word => query.includes(word)));
  const productMatch = products.find(product => query.includes(product.name.toLowerCase()));

  if (productMatch) {
    setTimeout(() => { closeConcierge(); openProduct(productMatch); }, 350);
    return `${productMatch.name} weighs ${productMatch.weight.toFixed(1)} grams in 21K gold and is available for ${fmt.format(productMatch.price)}. I’m opening its details for you.`;
  }
  if (categoryMatch) {
    setTimeout(() => setFilter(categoryMatch.category), 350);
    return `I’ve opened our ${categoryMatch.label} collection. Every piece in The Edit is crafted in 21K gold and priced in PKR.`;
  }
  if (query.includes('gold rate') || query.includes('rate') || query.includes('21k') || query.includes('24k') || query.includes('tola')) {
    const rate21 = document.querySelector('[data-rate-value="21k"]').textContent.replace(/\s+/g, ' ').trim();
    const rate24 = document.querySelector('[data-rate-value="24k"]').textContent.replace(/\s+/g, ' ').trim();
    return `Today’s indicative rates are ${rate21} and ${rate24}. They refresh automatically each day in PKR.`;
  }
  if (query.includes('custom') || query.includes('bespoke') || query.includes('design my') || query.includes('create')) {
    setTimeout(() => document.querySelector('#bespoke').scrollIntoView({ behavior: 'smooth', block: 'start' }), 350);
    return 'Our atelier would love to create something just for you. I’ve taken you to our bespoke service — you can request a private appointment there.';
  }
  if (query.includes('visit') || query.includes('location') || query.includes('where') || query.includes('showroom') || query.includes('address')) {
    return 'You can visit us at Al Rehman Square Mall, Shop #8, Al Rehman Garden Phase 2, Sharaqpur, Lahore. Use “Get directions” in the footer for the map.';
  }
  if (query.includes('call') || query.includes('phone') || query.includes('contact') || query.includes('whatsapp') || query.includes('email')) {
    return 'You can call us at +92 311 481 7882, email AlifLaamMeemjewellers@gmail.com, or use the WhatsApp button when you would like to speak with our team.';
  }
  if (query.includes('price') || query.includes('pkr') || query.includes('cost') || query.includes('budget')) {
    return 'All prices in The Edit are shown in PKR. Tell me whether you are looking for rings, necklaces, earrings, bangles, or bridal jewellery and I’ll take you there.';
  }
  if (query.includes('hello') || query.includes('salam') || query.includes('assalam')) {
    return 'Wa alaikum assalam. How may I help you find a piece that feels like yours?';
  }
  return 'I can help with 21K jewellery, PKR pricing, today’s gold rates, bridal pieces, bespoke orders, or visiting our Lahore showroom. What would you like to explore?';
}

function sendConciergeMessage(message, speakReply = false) {
  const question = message.trim();
  if (!question) return;
  appendConciergeMessage('user', question);
  const response = conciergeReply(question);
  appendConciergeMessage('bot', response);
  if (speakReply) speakConciergeReply(response);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function visibleProducts() {
  const filtered = state.filter === 'All' ? products : products.filter(product => product.category === state.filter);
  return state.showAll || state.filter !== 'All' ? filtered : filtered.slice(0, 12);
}

function productCard(product) {
  return `<article class="product-card" data-id="${product.id}">
    <div class="product-photo" style="background-image:url('${product.image}')">
      ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
      <button class="wish-button" aria-label="Save ${product.name}" title="Save for later">♡</button>
      <button class="quick-add">Quick add <span>→</span></button>
    </div>
    <div class="product-info"><p class="product-category">21K GOLD · ${product.type.toUpperCase()}</p>
      <div class="product-info-top"><h3 class="product-name">${product.name}</h3><p class="product-price">${fmt.format(product.price)}</p></div>
      <p class="product-weight">Net weight · ${formatWeight(product)}</p>
      <button class="product-detail-link">View details</button>
    </div>
  </article>`;
}

function renderProducts() {
  const shown = visibleProducts();
  const totalForFilter = state.filter === 'All' ? products.length : products.filter(product => product.category === state.filter).length;
  const remaining = totalForFilter - shown.length;
  grid.innerHTML = shown.map(productCard).join('');
  const loadMore = document.querySelector('.load-more');
  loadMore.innerHTML = `See ${remaining} more designs <span>↓</span>`;
  loadMore.style.display = remaining > 0 ? 'inline-flex' : 'none';
}

function setFilter(filter) {
  state.filter = filter;
  state.showAll = false;
  document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('active', chip.dataset.filter === filter));
  renderProducts();
  document.querySelector('#shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getProduct(id) { return products.find(product => product.id === Number(id)); }

function updateCart() {
  const count = state.cart.length;
  const subtotal = state.cart.reduce((total, product) => total + product.price, 0);
  document.querySelector('.bag-count').textContent = count;
  document.querySelector('.bag-count').classList.toggle('has-items', count > 0);
  document.querySelector('.drawer-count').textContent = `(${count})`;
  document.querySelector('.cart-subtotal').textContent = fmt.format(subtotal);
  const items = document.querySelector('.cart-items');
  const empty = document.querySelector('.empty-bag');
  const footer = document.querySelector('.cart-footer');
  empty.style.display = count ? 'none' : 'grid';
  footer.classList.toggle('active', count > 0);
  items.innerHTML = state.cart.map((item, index) => `<div class="cart-item"><div class="cart-item-image" style="background-image:url('${item.image}')"></div><div><h3>${item.name}</h3><p>21K gold · ${item.type} · ${item.weight.toFixed(1)} g</p><p class="cart-item-price">${fmt.format(item.price)}</p></div><button class="remove-item" data-index="${index}">Remove</button></div>`).join('');
}

function addToCart(product) {
  state.cart.push(product);
  updateCart();
  showToast(`${product.name} is in your bag.`);
}

function openCart() {
  closeSearch();
  cartDrawer.classList.add('active');
  cartDrawer.setAttribute('aria-hidden', 'false');
  overlay.classList.add('active');
  document.body.classList.add('drawer-open');
}
function closeCart() {
  cartDrawer.classList.remove('active');
  cartDrawer.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('active');
  document.body.classList.remove('drawer-open');
}
function openSearch() {
  closeCart();
  document.querySelector('.search-panel').classList.add('active');
  document.querySelector('.search-panel').setAttribute('aria-hidden', 'false');
  document.body.classList.add('search-open');
  setTimeout(() => document.querySelector('.search-form input').focus(), 250);
}
function closeSearch() {
  document.querySelector('.search-panel').classList.remove('active');
  document.querySelector('.search-panel').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('search-open');
}
function openProduct(product) {
  state.currentProduct = product;
  const modal = document.querySelector('.product-modal');
  modal.querySelector('.product-modal-image').style.backgroundImage = `url('${product.image}')`;
  modal.querySelector('.modal-type').textContent = product.type.toUpperCase();
  modal.querySelector('.modal-name').textContent = product.name;
  modal.querySelector('.modal-price').textContent = fmt.format(product.price);
  modal.querySelector('.modal-weight').textContent = `Net weight · ${formatWeight(product)}`;
  modal.querySelector('.modal-description').textContent = product.description;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}
function closeProduct() {
  document.querySelector('.product-modal').classList.remove('active');
  document.querySelector('.product-modal').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
function openAppointment() {
  const modal = document.querySelector('.appointment-modal');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}
function closeAppointment() {
  const modal = document.querySelector('.appointment-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

renderProducts();
updateCart();
enableMouseMotion();
refreshGoldRates();
// The cache avoids repeat requests; this catches the next PKT day for an open storefront.
window.setInterval(refreshGoldRates, 60 * 60 * 1000);

document.querySelectorAll('.filter-chip').forEach(chip => chip.addEventListener('click', () => setFilter(chip.dataset.filter)));
document.querySelectorAll('.collection-card').forEach(card => card.addEventListener('click', () => { setTimeout(() => setFilter(card.dataset.filter), 0); }));
document.querySelector('.load-more').addEventListener('click', () => { state.showAll = true; renderProducts(); });
document.querySelector('.view-all-control').addEventListener('click', () => { state.filter = 'All'; state.showAll = true; document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('active', chip.dataset.filter === 'All')); renderProducts(); });
document.querySelector('.filter-toggle').addEventListener('click', event => { const row = document.querySelector('.filter-row'); const open = row.getAttribute('aria-hidden') === 'true'; row.setAttribute('aria-hidden', !open); row.style.display = open ? 'flex' : 'none'; event.currentTarget.setAttribute('aria-expanded', open); });

grid.addEventListener('click', event => {
  const card = event.target.closest('.product-card');
  if (!card) return;
  const product = getProduct(card.dataset.id);
  if (event.target.closest('.wish-button')) {
    const button = event.target.closest('.wish-button');
    const nowSaved = button.classList.toggle('active');
    button.textContent = nowSaved ? '♥' : '♡';
    showToast(nowSaved ? 'Saved to your wishlist.' : 'Removed from your wishlist.');
  } else if (event.target.closest('.quick-add')) {
    addToCart(product);
  } else if (event.target.closest('.product-detail-link') || event.target.closest('.product-photo')) {
    openProduct(product);
  }
});

document.querySelector('.bag-trigger').addEventListener('click', openCart);
document.querySelectorAll('.drawer-close').forEach(button => button.addEventListener('click', closeCart));
overlay.addEventListener('click', closeCart);
document.querySelector('.cart-items').addEventListener('click', event => {
  const remove = event.target.closest('.remove-item');
  if (!remove) return;
  state.cart.splice(Number(remove.dataset.index), 1);
  updateCart();
  showToast('Piece removed from your bag.');
});
document.querySelector('.checkout-button').addEventListener('click', () => showToast('Checkout is ready to be connected to your preferred payment provider.'));

document.querySelector('.search-trigger').addEventListener('click', openSearch);
document.querySelector('.search-close').addEventListener('click', closeSearch);
document.querySelector('.search-form').addEventListener('submit', event => {
  event.preventDefault();
  const query = event.currentTarget.querySelector('input').value.trim().toLowerCase();
  if (!query) return;
  const result = products.find(product => `${product.name} ${product.category} ${product.type}`.toLowerCase().includes(query));
  if (result) { closeSearch(); openProduct(result); }
  else showToast('No exact match yet. Try “rings”, “bridal”, or “gold”.');
});
document.querySelectorAll('.search-suggestions button').forEach(button => button.addEventListener('click', () => {
  const search = document.querySelector('.search-form input'); search.value = button.textContent; search.focus();
}));

document.querySelector('.modal-close').addEventListener('click', closeProduct);
document.querySelector('.product-modal').addEventListener('click', event => { if (event.target === event.currentTarget) closeProduct(); });
document.querySelector('.modal-add').addEventListener('click', () => { if (state.currentProduct) { addToCart(state.currentProduct); closeProduct(); openCart(); } });
document.querySelector('.wishlist-modal').addEventListener('click', event => { event.currentTarget.classList.toggle('saved'); event.currentTarget.textContent = event.currentTarget.classList.contains('saved') ? '♥ Saved for later' : '♡ Save for later'; showToast(event.currentTarget.classList.contains('saved') ? 'Saved to your wishlist.' : 'Removed from your wishlist.'); });

document.querySelectorAll('.appointment-trigger, .mobile-appointment').forEach(button => button.addEventListener('click', openAppointment));
document.querySelectorAll('a[href="#appointment"]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); openAppointment(); }));
document.querySelector('.appointment-close').addEventListener('click', closeAppointment);
document.querySelector('.appointment-modal').addEventListener('click', event => { if (event.target === event.currentTarget) closeAppointment(); });
document.querySelector('.appointment-form').addEventListener('submit', event => { event.preventDefault(); event.currentTarget.querySelector('.appointment-message').textContent = 'Thank you — your private viewing request is on its way.'; event.currentTarget.reset(); });

document.querySelector('.newsletter-form').addEventListener('submit', event => { event.preventDefault(); const form = event.currentTarget; form.querySelector('.form-message').textContent = 'Thank you — we will be in touch with something beautiful.'; form.reset(); });

document.querySelector('.concierge-close').addEventListener('click', closeConcierge);
conciergeForm.addEventListener('submit', event => {
  event.preventDefault();
  sendConciergeMessage(conciergeInput.value);
  conciergeInput.value = '';
});
document.querySelectorAll('.concierge-prompts button').forEach(button => button.addEventListener('click', () => sendConciergeMessage(button.dataset.prompt)));
voiceTrigger.addEventListener('click', beginVoiceConversation);

document.querySelector('.account-trigger').addEventListener('click', () => showToast('Your client account experience is coming soon.'));
document.querySelector('.menu-toggle').addEventListener('click', event => { const button = event.currentTarget; const nav = document.querySelector('.mobile-nav'); const open = nav.classList.toggle('active'); button.classList.toggle('active', open); button.setAttribute('aria-expanded', open); nav.setAttribute('aria-hidden', !open); });
document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', () => { document.querySelector('.mobile-nav').classList.remove('active'); document.querySelector('.menu-toggle').classList.remove('active'); }));
document.querySelector('.close-announcement').addEventListener('click', () => { const bar = document.querySelector('.announcement-bar'); bar.style.display = 'none'; document.querySelector('.site-header').style.top = '0'; });

window.addEventListener('scroll', () => document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 70), { passive: true });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeCart(); closeSearch(); closeProduct(); closeAppointment(); closeConcierge(); } });
