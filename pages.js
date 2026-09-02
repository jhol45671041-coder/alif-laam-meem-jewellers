/**
 * Alif Laam Meem Jewellers — Shared Scripts & Interactive Features
 */
const WHATSAPP_NUMBER = '923244449745';

// Products helper
function getCatalogProducts() {
  return Array.isArray(window.almProducts) ? window.almProducts : [];
}

// 1. Announcement Bar
function setupAnnouncement() {
  const bar = document.querySelector('.announcement-bar');
  const close = document.querySelector('.announcement-close');
  if (!bar || !close) return;
  close.addEventListener('click', () => {
    bar.hidden = true;
    document.body.classList.add('announcement-hidden');
  });
}

// 2. Header & Navigation
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

// 3. Scroll Reveal Animations
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
  }, { threshold: .08 });
  items.forEach(item => observer.observe(item));
}

// 4. Catalog Filters
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

// 5. Global Cart Drawer & Overlay
function createCartDrawerElements() {
  if (document.querySelector('.cart-drawer')) return;

  const overlay = document.createElement('div');
  overlay.className = 'alm-overlay';
  overlay.id = 'alm-global-overlay';
  document.body.appendChild(overlay);

  const drawer = document.createElement('aside');
  drawer.className = 'cart-drawer';
  drawer.id = 'alm-cart-drawer';
  drawer.setAttribute('aria-label', 'Your Cart');
  drawer.innerHTML = `
    <div class="drawer-header">
      <h2>Your Cart <span id="drawer-item-count">(0)</span></h2>
      <button class="drawer-close" aria-label="Close cart">&times;</button>
    </div>
    <div class="cart-drawer-items" id="cart-drawer-items-list"></div>
    <div class="cart-drawer-footer" id="cart-drawer-footer">
      <p>Prices and custom sizes are confirmed directly with our Lahore atelier on WhatsApp. Complimentary insured delivery across Pakistan.</p>
      <button class="button button-gold" id="cart-drawer-checkout" style="width: 100%;">Message on WhatsApp &rarr;</button>
      <button class="button button-outline" id="cart-drawer-clear" style="width: 100%; min-height: 38px; font-size: 10px;">Clear Cart</button>
    </div>
  `;
  document.body.appendChild(drawer);

  // Search Overlay
  const searchModal = document.createElement('div');
  searchModal.className = 'search-overlay-modal';
  searchModal.id = 'alm-search-modal';
  searchModal.innerHTML = `
    <div class="search-modal-inner">
      <div class="search-modal-header">
        <p>DISCOVER ALIF LAAM MEEM</p>
        <button class="modal-close-btn" id="search-modal-close" aria-label="Close search" style="color:#fff;">&times;</button>
      </div>
      <div class="search-input-box">
        <svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:none;stroke:#c8a96e;stroke-width:1.8;"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4.2 4.2"></path></svg>
        <input type="search" id="alm-search-input" placeholder="Search rings, bridal sets, polki, gold..." autocomplete="off" />
      </div>
      <div class="search-results-box" id="alm-search-results"></div>
    </div>
  `;
  document.body.appendChild(searchModal);
}

function updateCartUI() {
  const items = window.almCart?.read ? window.almCart.read() : [];
  const catalog = getCatalogProducts();

  // Badges
  document.querySelectorAll('.page-badge-count, .bag-count').forEach(badge => {
    badge.textContent = items.length;
    badge.classList.toggle('has-items', items.length > 0);
  });

  // Drawer List
  const list = document.querySelector('#cart-drawer-items-list');
  const countSpan = document.querySelector('#drawer-item-count');
  const checkoutBtn = document.querySelector('#cart-drawer-checkout');

  if (countSpan) countSpan.textContent = `(${items.length})`;

  if (list) {
    if (!items.length) {
      list.innerHTML = `
        <div class="cart-drawer-empty">
          <span>&loz;</span>
          <h3 style="font: 500 22px var(--alm-serif); color: var(--alm-ink); margin: 0 0 8px;">Your cart is empty</h3>
          <p style="margin: 0; font-size: 13px;">Explore our rings, bridal sets, and 21K gold collections to begin.</p>
        </div>
      `;
      if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
      if (checkoutBtn) checkoutBtn.disabled = false;
      list.innerHTML = items.map((item, idx) => {
        const product = catalog.find(p => p.id === Number(item.id) || p.name === item.name) || {
          image: 'public/images/ring-solitaire.png',
          category: '21K Gold',
          type: 'Handcrafted Piece'
        };
        return `
          <div class="cart-item-row">
            <img class="cart-item-img" src="${product.image}" alt="${item.name}" />
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <p>${product.category} &bull; ${product.type}</p>
            </div>
            <button class="cart-item-remove" data-remove-index="${idx}" title="Remove piece">&times;</button>
          </div>
        `;
      }).join('');

      // Bind remove buttons
      list.querySelectorAll('[data-remove-index]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.removeIndex);
          window.almCart.remove(idx);
          updateCartUI();
        });
      });
    }
  }

  // Bottom Floating cart bar if present
  const bar = document.querySelector('.page-cart-bar');
  if (bar) {
    bar.hidden = !items.length;
    const countEl = bar.querySelector('[data-cart-count]');
    const summaryEl = bar.querySelector('[data-cart-summary]');
    const waLink = bar.querySelector('[data-cart-whatsapp]');
    if (countEl) countEl.textContent = items.length;
    if (summaryEl) {
      const names = items.map(i => i.name);
      summaryEl.textContent = names.length === 1 ? names[0] : `${names.length} pieces selected`;
    }
    if (waLink && window.almCart?.whatsappUrl) {
      waLink.href = window.almCart.whatsappUrl(items);
    }
  }
}

function openCartDrawer() {
  const drawer = document.querySelector('#alm-cart-drawer');
  const overlay = document.querySelector('#alm-global-overlay');
  if (!drawer || !overlay) return;
  drawer.classList.add('active');
  overlay.classList.add('active');
  document.body.classList.add('drawer-open');
}

function closeCartDrawer() {
  const drawer = document.querySelector('#alm-cart-drawer');
  const overlay = document.querySelector('#alm-global-overlay');
  if (!drawer || !overlay) return;
  drawer.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('drawer-open');
}

function openSearchModal() {
  const modal = document.querySelector('#alm-search-modal');
  const input = document.querySelector('#alm-search-input');
  if (!modal) return;
  modal.classList.add('active');
  document.body.classList.add('search-open');
  if (input) {
    input.value = '';
    renderSearchResults('');
    setTimeout(() => input.focus(), 100);
  }
}

function closeSearchModal() {
  const modal = document.querySelector('#alm-search-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.classList.remove('search-open');
}

function renderSearchResults(query) {
  const container = document.querySelector('#alm-search-results');
  if (!container) return;
  const q = query.toLowerCase().trim();
  const catalog = getCatalogProducts();

  let results = [];
  if (!q) {
    results = catalog.slice(0, 6);
  } else {
    results = catalog.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }

  if (!results.length) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 20px; color: #a5aca1;">
        <p>No jewellery pieces found matching "${query}".</p>
        <p style="font-size:12px; margin-top:8px;"><a href="contact.html" style="color:#dfc08a; text-decoration:underline;">Ask our bespoke atelier for custom designs &rarr;</a></p>
      </div>
    `;
    return;
  }

  container.innerHTML = results.map(item => `
    <a class="search-result-card" href="product.html?id=${item.id}">
      <img src="${item.image}" alt="${item.name}" />
      <div class="search-result-info">
        <h4>${item.name}</h4>
        <p>${item.category} &bull; ${item.type}</p>
      </div>
      <span style="font-size:16px; color:#dfc08a;">&rarr;</span>
    </a>
  `).join('');
}

function setupCartAndSearch() {
  createCartDrawerElements();

  // Open Drawer trigger
  document.querySelectorAll('.bag-trigger, [data-open-cart]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  // Open Search trigger
  document.querySelectorAll('.search-trigger, [data-open-search]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openSearchModal();
    });
  });

  // Drawer Closers
  const drawerClose = document.querySelector('.drawer-close');
  if (drawerClose) drawerClose.addEventListener('click', closeCartDrawer);

  const searchClose = document.querySelector('#search-modal-close');
  if (searchClose) searchClose.addEventListener('click', closeSearchModal);

  const overlay = document.querySelector('#alm-global-overlay');
  if (overlay) overlay.addEventListener('click', () => {
    closeCartDrawer();
    closeSearchModal();
  });

  // Search input live handler
  const searchInput = document.querySelector('#alm-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => renderSearchResults(e.target.value));
  }

  // Cart Drawer Clear
  const clearBtn = document.querySelector('#cart-drawer-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      window.almCart.clear();
      updateCartUI();
    });
  }

  // Cart Drawer Checkout
  const checkoutBtn = document.querySelector('#cart-drawer-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const items = window.almCart?.read ? window.almCart.read() : [];
      window.open(window.almCart.whatsappUrl(items), '_blank', 'noopener,noreferrer');
    });
  }

  // "Add to cart" buttons on tiles
  document.querySelectorAll('.tile-inquire, [data-cart-add]').forEach(button => {
    if (button.dataset.cartBound) return;
    button.dataset.cartBound = 'true';
    button.addEventListener('click', event => {
      event.preventDefault();
      const name = button.dataset.product || 'a jewellery piece';
      const id = button.dataset.productId || '';
      window.almCart.add({ id, name });
      updateCartUI();
      openCartDrawer();
    });
  });

  updateCartUI();
}

// 6. Interactive Ring Size Tool (for rings.html)
function setupRingSizer() {
  const slider = document.querySelector('#ring-size-slider');
  const circle = document.querySelector('#ring-sizer-circle');
  const label = document.querySelector('#ring-sizer-label');
  const usSizeEl = document.querySelector('#sizer-us-size');
  const pkSizeEl = document.querySelector('#sizer-pk-size');
  const diamEl = document.querySelector('#sizer-diam');

  if (!slider || !circle) return;

  const sizes = [
    { us: '4', pk: '8', mm: 14.9 },
    { us: '5', pk: '10', mm: 15.7 },
    { us: '6', pk: '12', mm: 16.5 },
    { us: '7', pk: '14', mm: 17.3 },
    { us: '8', pk: '16', mm: 18.1 },
    { us: '9', pk: '18', mm: 19.0 },
    { us: '10', pk: '20', mm: 19.8 },
    { us: '11', pk: '22', mm: 20.6 },
    { us: '12', pk: '24', mm: 21.4 }
  ];

  const update = () => {
    const idx = Math.min(Math.max(0, parseInt(slider.value, 10)), sizes.length - 1);
    const data = sizes[idx];
    const px = Math.round(data.mm * 4.5);
    circle.style.width = `${px}px`;
    circle.style.height = `${px}px`;
    if (label) label.textContent = `${data.mm} mm`;
    if (usSizeEl) usSizeEl.textContent = `US ${data.us}`;
    if (pkSizeEl) pkSizeEl.textContent = `PK/IN ${data.pk}`;
    if (diamEl) diamEl.textContent = `${data.mm} mm`;
  };

  slider.addEventListener('input', update);
  update();
}

// 7. Interactive Bridal Trousseau Checklist (for bridal.html)
function setupBridalChecklist() {
  const checkboxes = document.querySelectorAll('.trousseau-checkbox');
  const countEl = document.querySelector('#trousseau-selected-count');
  const totalEl = document.querySelector('#trousseau-total-count');
  const quoteBtn = document.querySelector('#trousseau-quote-btn');

  if (!checkboxes.length || !quoteBtn) return;

  const update = () => {
    const selected = [];
    checkboxes.forEach(cb => {
      const item = cb.closest('.trousseau-item');
      if (cb.checked) {
        if (item) item.classList.add('checked');
        selected.push(cb.dataset.item || cb.value);
      } else {
        if (item) item.classList.remove('checked');
      }
    });

    if (countEl) countEl.textContent = selected.length;
    if (totalEl) totalEl.textContent = checkboxes.length;

    const message = selected.length
      ? `Assalam-o-alaikum! I am planning my bridal trousseau with Alif Laam Meem and would like a consultation for: ${selected.join(', ')}.`
      : `Assalam-o-alaikum! I would like to book a bridal jewellery consultation with Alif Laam Meem.`;

    quoteBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  checkboxes.forEach(cb => cb.addEventListener('change', update));
  update();
}

// 8. Interactive Bespoke 4-Step Builder (for bespoke.html)
function setupBespokeBuilder() {
  const wizard = document.querySelector('.bespoke-wizard');
  if (!wizard) return;

  const tabs = wizard.querySelectorAll('.wizard-step-tab');
  const stepPanels = wizard.querySelectorAll('.wizard-step-panel');
  const summaryBox = wizard.querySelector('#wizard-summary-text');
  const waBtn = wizard.querySelector('#wizard-wa-submit');

  const state = {
    category: 'Engagement / Solitaire Ring',
    metal: '21K Traditional Yellow Gold',
    stones: 'Uncut Polki & Basra Pearls',
    budget: 'PKR 400,000 - PKR 800,000'
  };

  const updateSummary = () => {
    if (summaryBox) {
      summaryBox.innerHTML = `<strong>Selected:</strong> ${state.category} &bull; ${state.metal} &bull; ${state.stones} &bull; Budget: ${state.budget}`;
    }
    if (waBtn) {
      const msg = `Assalam-o-alaikum! I am designing a bespoke piece with ALM Atelier:\n- Category: ${state.category}\n- Metal & Karat: ${state.metal}\n- Gemstones: ${state.stones}\n- Budget Range: ${state.budget}\nPlease arrange a CAD sketch & consultation.`;
      waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }
  };

  // Step Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const step = tab.dataset.step;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      stepPanels.forEach(p => p.style.display = p.dataset.stepPanel === step ? 'block' : 'none');
    });
  });

  // Option selection
  wizard.querySelectorAll('.wizard-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const group = opt.dataset.group;
      const value = opt.dataset.value;
      wizard.querySelectorAll(`.wizard-option[data-group="${group}"]`).forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      if (group && value) {
        state[group] = value;
        updateSummary();
      }
    });
  });

  updateSummary();
}

// 9. Interactive Karat & Gold Purity Calculator (for craft.html & all-jewellery.html)
function setupKaratCalculator() {
  const weightInput = document.querySelector('#karat-weight-input');
  const karatSelect = document.querySelector('#karat-select');
  const outputPure = document.querySelector('#karat-pure-grams');
  const outputPrice = document.querySelector('#karat-est-price');
  const outputDesc = document.querySelector('#karat-desc');

  if (!weightInput || !karatSelect) return;

  const BASE_24K_PER_GRAM = 39000; // Indicative PKR / gram

  const update = () => {
    const grams = parseFloat(weightInput.value) || 0;
    const karat = parseFloat(karatSelect.value) || 21;
    const purityFactor = karat / 24;
    const pureGrams = (grams * purityFactor).toFixed(2);
    const estTotal = Math.round(grams * BASE_24K_PER_GRAM * purityFactor);

    if (outputPure) outputPure.textContent = `${pureGrams} g Pure Gold`;
    if (outputPrice) outputPrice.textContent = `₨${estTotal.toLocaleString()}`;
    if (outputDesc) {
      outputDesc.textContent = `${grams}g in ${karat}K contains ${(purityFactor * 100).toFixed(1)}% pure gold with signature artisan strength.`;
    }
  };

  weightInput.addEventListener('input', update);
  karatSelect.addEventListener('change', update);
  update();
}

// 10. FAQ Accordions (for care.html, contact.html)
function setupFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const wasActive = item.classList.contains('active');
      // close all siblings in this list
      const list = item.closest('.faq-list');
      if (list) list.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

// 11. Forms
function setupForms() {
  document.querySelectorAll('.newsletter-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('.newsletter-status, .form-message');
    if (status) status.textContent = 'Thank you — something beautiful is on its way.';
    form.reset();
  }));

  document.querySelectorAll('.inquiry-form, .appointment-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.querySelector('[name="name"], input[type="text"]')?.value.trim() || 'Valued Client';
    const message = form.querySelector('.form-status, .appointment-message');
    if (message) message.textContent = `Assalam-o-alaikum ${name}, your private viewing request has been received. Our team will contact you on WhatsApp shortly.`;
    form.reset();
  }));
}

// 12. Smooth Link Scroll
function setupSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (href === '#' || href === '#top') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

// 13. Footer Year
function setupFooterYear() {
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
}

// Init everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setupAnnouncement();
  setupHeader();
  setupReveal();
  setupCatalogFilters();
  setupCartAndSearch();
  setupRingSizer();
  setupBridalChecklist();
  setupBespokeBuilder();
  setupKaratCalculator();
  setupFaqAccordion();
  setupForms();
  setupSmoothLinks();
  setupFooterYear();
});

// If DOM already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  setupAnnouncement();
  setupHeader();
  setupReveal();
  setupCatalogFilters();
  setupCartAndSearch();
  setupRingSizer();
  setupBridalChecklist();
  setupBespokeBuilder();
  setupKaratCalculator();
  setupFaqAccordion();
  setupForms();
  setupSmoothLinks();
  setupFooterYear();
}
