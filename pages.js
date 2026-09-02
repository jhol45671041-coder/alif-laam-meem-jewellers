const WHATSAPP_NUMBER = '923244449745';

function setupAnnouncement() {
  const bar = document.querySelector('.announcement-bar');
  const close = document.querySelector('.announcement-close');
  if (!bar || !close) return;
  close.addEventListener('click', () => {
    bar.hidden = true;
    document.body.classList.add('announcement-hidden');
  });
}

function setupHeader() {
  const header = document.querySelector('.page-header');
  const toggle = document.querySelector('.page-menu-toggle');
  const mobileNav = document.querySelector('.page-mobile-nav');
  if (!header) return;

  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 42);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('active');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
      mobileNav.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('menu-open', open);
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    }));
  }

  const current = document.body.dataset.page;
  document.querySelectorAll('[data-page-link]').forEach(link => {
    if (link.dataset.pageLink === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('revealed'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach(item => observer.observe(item));
}

function setupCatalogFilters() {
  const filters = document.querySelectorAll('.catalog-filter');
  const tiles = document.querySelectorAll('.product-tile');
  const empty = document.querySelector('.catalog-empty');
  const count = document.querySelector('.catalog-count');
  if (!filters.length || !tiles.length) return;

  const update = filter => {
    let visible = 0;
    tiles.forEach(tile => {
      const tags = (tile.dataset.tags || '').split('|');
      const show = filter === 'all' || tags.includes(filter);
      tile.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });
    filters.forEach(button => button.classList.toggle('active', button.dataset.filter === filter));
    if (count) count.textContent = `${String(visible).padStart(2, '0')} DESIGNS`;
    if (empty) empty.classList.toggle('visible', visible === 0);
  };

  filters.forEach(button => button.addEventListener('click', () => update(button.dataset.filter)));
  update('all');
}

function cartItems() {
  return window.almCart?.read ? window.almCart.read() : [];
}

function updatePageCartBar(bar) {
  const items = cartItems();
  const count = bar.querySelector('[data-cart-count]');
  const messageLink = bar.querySelector('[data-cart-whatsapp]');
  const names = items.map(item => item.name).filter(Boolean);
  bar.hidden = !items.length;
  if (count) count.textContent = items.length;
  if (messageLink && window.almCart?.whatsappUrl) {
    messageLink.href = window.almCart.whatsappUrl(items);
    messageLink.setAttribute('aria-label', `Message ALM about ${items.length} selected piece${items.length === 1 ? '' : 's'}`);
  }
  bar.querySelector('[data-cart-summary]').textContent = names.length === 1 ? names[0] : `${items.length} pieces selected`;
}

function createPageCartBar() {
  if (!window.almCart || document.querySelector('.page-cart-bar')) return null;
  const bar = document.createElement('aside');
  bar.className = 'page-cart-bar';
  bar.hidden = true;
  bar.setAttribute('aria-label', 'Selected jewellery');
  bar.innerHTML = `<div><strong><span data-cart-count>0</span> in your cart</strong><span data-cart-summary></span></div><button type="button" data-cart-clear>Clear</button><a class="button button-gold" data-cart-whatsapp href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer">Message on WhatsApp <span>↗</span></a>`;
  document.body.appendChild(bar);
  bar.querySelector('[data-cart-clear]').addEventListener('click', () => {
    window.almCart.clear();
    updatePageCartBar(bar);
  });
  updatePageCartBar(bar);
  return bar;
}

function addToWhatsAppCart(button, bar) {
  const name = button.dataset.product || 'a jewellery piece';
  const id = button.dataset.productId || '';
  const items = window.almCart.add({ id, name });
  updatePageCartBar(bar);
  const original = button.textContent;
  button.textContent = 'Added · WhatsApp ↗';
  window.setTimeout(() => { button.textContent = original; }, 2200);
  // Adding a piece opens the direct WhatsApp enquiry; the cart bar remains available for a multi-piece message.
  window.open(window.almCart.whatsappUrl(items), '_blank', 'noopener,noreferrer');
}

function setupCart() {
  const bar = createPageCartBar();
  if (!bar) return;
  document.querySelectorAll('.tile-inquire, [data-cart-add]').forEach(button => {
    if (button.dataset.cartBound) return;
    button.dataset.cartBound = 'true';
    button.addEventListener('click', event => {
      event.preventDefault();
      addToWhatsAppCart(button, bar);
    });
  });
}

function setupForms() {
  document.querySelectorAll('.newsletter-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('.newsletter-status');
    if (status) status.textContent = 'Thank you — something beautiful is on its way.';
    form.reset();
  }));

  document.querySelectorAll('.inquiry-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.querySelector('[name="name"]')?.value.trim() || 'there';
    const interest = form.querySelector('[name="interest"]')?.value || 'jewellery';
    const message = form.querySelector('.form-status');
    if (message) message.textContent = `Thank you, ${name}. Your ${interest.toLowerCase()} enquiry is ready for our team.`;
    form.reset();
  }));
}

function setupSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

function setupFooterYear() {
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
}

setupAnnouncement();
setupHeader();
setupReveal();
setupCatalogFilters();
setupCart();
setupForms();
setupSmoothLinks();
setupFooterYear();
