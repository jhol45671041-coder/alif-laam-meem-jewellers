const ALM_CART_KEY = 'alm-cart';

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(ALM_CART_KEY));
    if (!Array.isArray(saved)) return [];
    return saved.map(item => {
      if (typeof item === 'string') return { name: item };
      return { id: item?.id, name: item?.name };
    }).filter(item => item.name);
  } catch (_) {
    return [];
  }
}

function writeCart(items) {
  try { localStorage.setItem(ALM_CART_KEY, JSON.stringify(items)); } catch (_) { /* private mode */ }
  return items;
}

function addCartItem(item) {
  const current = readCart();
  current.push({ id: item.id || '', name: item.name });
  return writeCart(current);
}

function removeCartItem(index) {
  const current = readCart();
  current.splice(Number(index), 1);
  return writeCart(current);
}

function clearCartItems() {
  return writeCart([]);
}

function cartMessage(items = readCart()) {
  const names = items.map(item => item.name).filter(Boolean);
  return names.length
    ? `Assalam-o-alaikum! I would like today's prices and availability for: ${names.join(', ')}.`
    : 'Assalam-o-alaikum! I would like to know more about your jewellery.';
}

function cartWhatsAppUrl(items = readCart()) {
  return `https://wa.me/923244449745?text=${encodeURIComponent(cartMessage(items))}`;
}

window.almCart = { read: readCart, save: writeCart, add: addCartItem, remove: removeCartItem, clear: clearCartItems, message: cartMessage, whatsappUrl: cartWhatsAppUrl };
