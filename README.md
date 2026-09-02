# Alif Laam Meem Jewellers

A static, multi-page jewellery storefront for Alif Laam Meem Jewellers.

## Pages

The site includes 18 HTML pages:

- `index.html` — home / collection overview
- `all-jewellery.html` — complete 50-piece catalogue
- `product.html?id=...` — reusable product detail page for every piece
- `intro.html` — the ALM story
- `rings.html` — rings edit
- `bridal.html` — bridal edit
- `necklaces.html` — necklaces edit
- `earrings.html` — earrings edit
- `bangles.html` — bangles and bracelets edit
- `everyday-gold.html` — everyday gold edit
- `heirloom.html` — heirloom edit
- `new-arrivals.html` — latest designs
- `bespoke.html` — bespoke atelier
- `craft.html` — craft and karigari
- `journal.html` — journal stories
- `contact.html` — private viewings and enquiries
- `care.html` — client care, policies and FAQs
- `voice-concierge.html` — live voice concierge

The complete catalogue contains 50 unique jewellery image references in `public/images/`. Product data is shared through `catalog-data.js`; the homepage uses it for the catalogue and `product.html` uses the query string to render each individual piece. Product imagery is lazy-loaded where possible, and the site includes responsive navigation, collection filters, an `alm-cart` local cart that sends selected pieces directly to WhatsApp, structured metadata, a favicon, form feedback, and client-care guidance. Replace the placeholder catalogue copy, generated/detail imagery, contact policies, and frontend-only form handling with final business content before launch. Run locally with `python3 -m http.server 4173` from the repository root.
