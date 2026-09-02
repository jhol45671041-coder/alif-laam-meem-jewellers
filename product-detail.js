const allProducts = Array.isArray(window.almProducts) ? window.almProducts : [];
const categoryRoutes = {
  Rings: 'rings.html',
  Bridal: 'bridal.html',
  Necklaces: 'necklaces.html',
  Earrings: 'earrings.html',
  Bangles: 'bangles.html'
};
const params = new URLSearchParams(window.location.search);
const requestedId = Number(params.get('id'));
const product = allProducts.find(item => item.id === requestedId) || allProducts[0];

function tolaWeight(grams) {
  return (Number(grams) / 11.6638038).toFixed(2);
}

function stoneLabel(type) {
  const value = type.toLowerCase();
  if (value.includes('diamond')) return 'Certified diamonds';
  if (value.includes('emerald')) return 'Natural emerald detail';
  if (value.includes('ruby')) return 'Ruby detail';
  if (value.includes('pearl')) return 'Pearl detail';
  if (value.includes('moonstone')) return 'Moonstone detail';
  if (value.includes('sapphire')) return 'Sapphire detail';
  if (value.includes('gemstone') || value.includes('navratna')) return 'Gemstone detail';
  return 'Gold detail';
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function renderProduct() {
  if (!product) return;
  const categoryPage = categoryRoutes[product.category] || 'all-jewellery.html';
  const reference = `ALM-${String(product.id).padStart(3, '0')}`;
  const name = product.name;
  const weight = Number(product.weight);
  const image = document.querySelector('#product-detail-image');
  const badge = document.querySelector('#product-badge');
  const categoryLink = document.querySelector('#product-category-link');
  const whatsapp = document.querySelector('#product-whatsapp');

  document.title = `${name} · Alif Laam Meem Jewellers`;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = `${name} — a hand-finished 21K gold piece from Alif Laam Meem Jewellers.`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = `${name} · Alif Laam Meem Jewellers`;
  if (image) {
    image.src = product.image;
    image.alt = `${name}, ${product.type}, in 21K gold`;
  }
  if (badge) {
    badge.hidden = !product.tag;
    badge.textContent = product.tag || '';
  }
  if (categoryLink) {
    categoryLink.href = categoryPage;
    categoryLink.textContent = product.category.toUpperCase();
  }
  setText('#product-breadcrumb-name', name.toUpperCase());
  setText('#product-reference', reference);
  setText('#product-detail-type', product.type.toUpperCase());
  setText('#product-detail-name', name);
  setText('#product-detail-weight', `NET WEIGHT · ${weight.toFixed(1)} g · ${tolaWeight(weight)} TOLA`);
  setText('#product-detail-description', product.description);
  setText('#product-stones', stoneLabel(product.type));
  if (whatsapp) {
    whatsapp.dataset.product = name;
    whatsapp.href = `https://wa.me/923244449745?text=${encodeURIComponent(`Assalam-o-alaikum! I would like to enquire about ${name}. Please share today's price, availability and delivery details.`)}`;
  }

  const ringField = document.querySelector('#ring-size-field');
  const ringSize = document.querySelector('#product-ring-size');
  if (ringField) ringField.hidden = product.category !== 'Rings';
  if (ringSize && whatsapp) {
    ringSize.addEventListener('change', () => {
      const sizeNote = ringSize.value === 'Need help choosing' ? ' I also need help choosing the ring size.' : ` Preferred size: ${ringSize.value.replace('Size ', '')}.`;
      whatsapp.dataset.product = `${name}.${sizeNote}`;
    });
  }
  renderStructuredData();
  renderRelated();
}

function renderStructuredData() {
  if (!product) return;
  const existing = document.querySelector('#product-structured-data');
  if (existing) existing.remove();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [product.image],
    category: product.category,
    material: '21K gold',
    brand: { '@type': 'Brand', name: 'Alif Laam Meem Jewellers' },
    weight: { '@type': 'QuantitativeValue', value: Number(product.weight), unitCode: 'GRM' },
    url: `${window.location.origin}${window.location.pathname}?id=${product.id}`
  };
  const script = document.createElement('script');
  script.id = 'product-structured-data';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function renderRelated() {
  const grid = document.querySelector('#related-grid');
  const empty = document.querySelector('#related-empty');
  if (!grid || !product) return;
  const related = allProducts.filter(item => item.category === product.category && item.id !== product.id).slice(0, 4);
  if (!related.length) {
    if (empty) empty.style.display = 'block';
    return;
  }
  grid.innerHTML = related.map(item => `<a class="related-card reveal revealed" href="product.html?id=${item.id}"><span class="related-card-image" style="background-image:url('${item.image}')" aria-hidden="true"></span><span class="related-card-content"><p>${item.category} · 21K GOLD</p><h3>${item.name}</h3><span>${Number(item.weight).toFixed(1)} g · View piece ↗</span></span></a>`).join('');
}

const referenceButton = document.querySelector('.product-secondary-action');
if (referenceButton) {
  referenceButton.addEventListener('click', async () => {
    const reference = `ALM-${String(product?.id || 1).padStart(3, '0')}`;
    try {
      await navigator.clipboard.writeText(reference);
      referenceButton.textContent = `${reference} copied`;
    } catch (_) {
      referenceButton.textContent = reference;
    }
    window.setTimeout(() => { referenceButton.textContent = 'Copy product reference'; }, 2200);
  });
}

renderProduct();
