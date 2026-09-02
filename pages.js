const WHATSAPP_NUMBER = '923244449745';

function whatsappUrl(message = 'Assalam-o-alaikum! I would like to know more about your jewellery.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

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
    if (link.dataset.pageLink === current) link.classList.add('active');
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

function setupInquiryButtons() {
  document.querySelectorAll('.tile-inquire, [data-whatsapp]').forEach(button => {
    if (button.dataset.whatsappBound) return;
    button.dataset.whatsappBound = 'true';
    button.addEventListener('click', event => {
      if (button.tagName === 'A' && !button.dataset.whatsapp) return;
      event.preventDefault();
      const product = button.dataset.product || 'a jewellery piece';
      window.open(whatsappUrl(`Assalam-o-alaikum! I would like to enquire about ${product}. Please share today's price and availability.`), '_blank', 'noopener,noreferrer');
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
setupInquiryButtons();
setupForms();
setupSmoothLinks();
setupFooterYear();
