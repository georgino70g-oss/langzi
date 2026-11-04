# LANGZI Shop

A static, bilingual (Greek / English) online shop for LANGZI men's plaid shirts.
Built with React + Vite + TypeScript. Orders are sent through **Netlify Forms** (no server, no database).
Payment: **bank transfer (IBAN)** or **IRIS** (no cash on delivery, no cards). Shipping: **€5 per order**, free for **store pickup**.

> **Honest limits (please read)**
> - **Stock is manual.** Stock numbers live in `src/data/products.ts`. They are NOT shared between customers or devices. The site can only stop obviously wrong carts; it can **not** guarantee real-time stock. **You must check availability before confirming every order.**
> - **Prices in the browser are not trusted.** Check the price, shipping and stock of each order yourself before confirming it.
> - **Legal pages are templates**, not finished legal documents. Complete them and have them checked (lawyer / accountant) against Greek and EU rules before launch.
> - The site has **not been deployed or tested live** by the author of this code. Follow the checklists below to test a real order.

---

## 1. First-time setup (Windows or Mac)

1. **Install Node.js** (the LTS version) from <https://nodejs.org>. Install with the default options.
2. **Install VS Code** from <https://code.visualstudio.com>.
3. Open VS Code → **File → Open Folder…** → choose the `langzi-shop` folder.
4. Open the terminal in VS Code: **Terminal → New Terminal**.
5. Install the packages (only once):
   ```
   npm install
   ```
6. Start the site on your computer:
   ```
   npm run dev
   ```
   Open the address it prints (usually <http://localhost:5173>).
   Stop it with `Ctrl + C`.

Other commands:

| Command | What it does |
|---|---|
| `npm run dev` | Local preview that updates as you edit |
| `npm test` | Runs the automated tests (pricing, stock, validation, cart, checkout) |
| `npm run build` | Creates the final site in the `dist` folder |
| `npm run preview` | Previews the built site locally |

> Checkout on your own computer shows a "DEV MODE" message and sends nothing. Netlify Forms only works on a deployed Netlify site. This is on purpose: the site must never pretend an order was sent.

---

## 2. Where things are

```
langzi-shop/
  images/                 <- ALL product photos go here (kept separate from code)
  public/
    __forms.html          <- registers the order form with Netlify (see section 9)
    favicon.svg
    robots.txt, sitemap.xml   <- generated automatically on build
  src/
    data/
      products.ts         <- THE product catalog (edit this to add/change products and stock)
      siteConfig.ts       <- shipping cost, contact details, site URL, analytics IDs, size table
      el.ts / en.ts       <- Greek / English texts for buttons, menus, messages
      legal.ts            <- Privacy, Terms, Shipping, Returns templates (Greek + English)
    utils/bundlePricing.ts <- the ONE place with the price algorithm (tested)
    components/ pages/ context/ styles/
  netlify.toml            <- Netlify build settings
```

---

## 3. Add a new product

1. Put the photos in the `images/` folder (see section 4).
2. Open `src/data/products.ts`.
3. Copy one product block (from `{` to `},`), paste it at the end of the list, and change:
   - `id` — unique, no spaces, e.g. `shirt-014` (this becomes the page address `/products/shirt-014`)
   - `sku` — your product code, e.g. `LZ-014`
   - `name` and `description` — **both** `el` (Greek) and `en` (English)
   - `image` — the main photo file name, e.g. `shirt-014-front.webp`
   - `images` — optional extra photos, e.g. `['shirt-014-back.webp']`
   - `stock` — how many you have per size
   - `active` — `true` to show it, `false` to hide it
   - Delete the line `sample: true` (it marks placeholder data)
4. Save. The product appears on the site automatically. No other file needs editing.

Hide a product: set `active: false`.

## 4. Add or replace images

- Put files in the `images/` folder. Recommended names: `shirt-001-front.webp`, `shirt-001-back.webp`, `shirt-002-detail.webp`.
- Best format: **WebP** (also supported: AVIF, JPG, PNG). Recommended portrait ratio **4:5** (e.g. 800 × 1000 px). Keep each file small (ideally under 200 KB) so the site stays fast.
- To replace a photo: save the new file with the same name.
- If a file is missing the site shows a clean coloured placeholder instead of a broken image.
- After adding images while `npm run dev` is running, refresh the page. If a new image does not show, stop (`Ctrl + C`) and run `npm run dev` again.

## 5. Update stock by size

In `src/data/products.ts`, change the numbers in `stock`:

```ts
stock: { M: 4, L: 6, XL: 5, XXL: 2, '3XL': 0 },
```

`0` means that size shows as unavailable (greyed out, cannot be selected). After changing stock, **redeploy** (section 10). Remember: when an order arrives, update the stock yourself afterwards.

## 6. Edit Greek and English texts

- Menus, buttons, messages: `src/data/el.ts` (Greek) and `src/data/en.ts` (English). Both files must have the same keys. If you add a key to one, add it to the other (the build will tell you if you forget).
- Words like `{p1}` or `{n}` are filled in automatically — keep them.
- Legal pages: `src/data/legal.ts`. Text in `[square brackets]` is a gap you must fill.
- Product texts live in `products.ts` (no automatic translation is used).

## 7. Configure business details, shipping and more (`src/data/siteConfig.ts`)

- **Shipping cost:** `shippingCostEUR: 5` = €5 once per order, whatever the number of shirts. Customers who choose **store pickup** at checkout pay no shipping (and don't need to give an address). Change the number to change the fee; `null` means "not decided" (the site then shows no grand total).
- **Phone and hours:** `business.phone` and `business.openingHours` / `openingHoursShort` (currently Monday–Friday 10:00–14:30). The phone is shown in the top bar of every page as a tap-to-call link.
- **Contact details:** fill in `business.email`, `business.address`, etc. Empty fields are simply not shown. If you fill in `business.address`, it is also shown to customers who choose store pickup.
- **Payment details (IBAN / IRIS):** fill in `payment.iban`, `payment.accountHolder`, `payment.bankName`, `payment.bic` and `payment.irisId` (the phone or VAT number customers use to pay you via IRIS). They appear on the order-confirmation page, together with the amount, after the customer submits the order, with a note not to pay before you confirm availability. If left empty, the customer is told you will send the payment details with your confirmation.
- **Site URL:** after the first deploy put your Netlify address in `siteUrl` (e.g. `'https://langzi.netlify.app'`, no slash at the end). This switches on canonical links, hreflang, the sitemap and Open Graph URLs. Rebuild/redeploy after changing it.
- **Size guide measurements:** fill in `sizeGuide` (cm). Until then the table shows "—" and a note. Please measure your own shirts.
- **Analytics (optional):** `analytics.ga4MeasurementId` / `metaPixelId`. Empty = nothing is loaded. If you set one, a cookie banner appears and the tracker loads **only after the visitor accepts**. Check consent requirements with your adviser before using it.
- **Sample badges:** `showSampleBadges: true` shows "SAMPLE" on products marked `sample: true`.
- **Logo:** the logo is text in `src/components/Logo.tsx`. To use a real logo, put the file in `public/` and replace the content of that component with `<img src="/logo.svg" alt="LANGZI" height="32" />`.

## 8. Bundle prices

1 shirt = €25, 2 = €40, 3 = €50, mixing any designs and sizes. For more: every complete group of 3 costs €50, and the remaining 1 or 2 shirts cost €25 or €40.
Examples: 4 → €75, 5 → €90, 6 → €100, 7 → €125.
The algorithm lives only in `src/utils/bundlePricing.ts` and is covered by tests. The amounts are in `BUNDLE_PRICES` at the top of that file. (The Terms template in `legal.ts` also mentions the three prices as text — update it if you change them.)

---

## 9. How orders reach you (Netlify Forms)

- The customer fills the checkout form. The browser sends it to Netlify. You see it in **Netlify dashboard → your site → Forms → `langzi-order`**.
- `public/__forms.html` is a hidden copy of the form that lets Netlify find it during deployment. Its field names **must match** the checkout form. If you ever add/rename a field in `src/pages/Checkout.tsx`, change `public/__forms.html` too and **redeploy**. (`npm test` checks that the submitted fields and `__forms.html` match.)
- The order contains: name, phone, optional email, delivery method (shipping / store pickup), address, postal code, city, region (empty for pickup), notes, payment method (bank transfer / IRIS), a text summary (SKU, design, size, quantity), number of shirts, products subtotal, shipping status, displayed total, language.
- No card data and no bank details of the customer are ever collected.
- Spam protection: Netlify honeypot (`bot-field`) plus Netlify's built-in spam filtering. You can add reCAPTCHA later in Netlify's form settings if spam appears.

### Get an email for each order

1. Netlify dashboard → your site → **Forms** → **Form notifications** (also found under **Site configuration → Forms**).
2. **Add notification → Email notification**.
3. Choose the form `langzi-order` and type the email address that should receive orders.

*(Recipient email: to be added by the owner.)*

---

## 10. Deploy to Netlify (free `*.netlify.app` address)

### Option A — via GitHub (recommended: updates deploy automatically)
1. Create a free account at <https://app.netlify.com> and at <https://github.com>.
2. Put the project in a GitHub repository (VS Code → Source Control → **Publish to GitHub**). Make sure the `node_modules` and `dist` folders are not uploaded (the included `.gitignore` handles this).
3. In Netlify: **Add new site → Import an existing project → GitHub** → pick the repository.
4. Build settings are read from `netlify.toml`: build command `npm run build`, publish directory `dist`. Click **Deploy**.
5. When finished, Netlify shows an address like `https://something-random.netlify.app`. Change it under **Site configuration → Change site name** (e.g. `langzi`).

### Option B — Netlify CLI
```
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

### After each change
Edit → save → (GitHub option) commit and push → Netlify rebuilds automatically. With the CLI repeat `npm run build` and `netlify deploy --prod --dir=dist`.

### Enable and check Forms
- Netlify dashboard → **Forms** → make sure form detection is **enabled**, and after the first deploy you should see a form named `langzi-order`. If not: **Site configuration → Forms → Enable form detection**, then **Deploys → Trigger deploy → Deploy site**.
- Redeploy whenever the form's fields change.

---

## 11. Deployment checklist

- [ ] `npm install`, `npm test` (all pass) and `npm run build` (no errors) on your computer
- [ ] Real products, names (Greek + English), photos, prices understood, stock entered; `sample: true` removed
- [ ] `shippingCostEUR` (currently 5) and phone hours confirmed; IBAN / IRIS details entered
- [ ] `business` details, size table and legal templates completed and reviewed
- [ ] Deployed; Netlify address obtained; `siteUrl` filled in and redeployed
- [ ] Form detection enabled; `langzi-order` visible under Forms
- [ ] Email notification configured
- [ ] Manual live-order test done (below)
- [ ] Tested on a phone in Greek and English

## 12. Manual live-order test (on the deployed site)

1. Open the site on your phone. Add 3 different shirts in 3 different sizes → the cart must show **€50** products subtotal.
2. Add a 4th → €75. Remove one → back to €50.
3. Refresh the page → the cart is still there.
4. Try to select a greyed-out size → not possible.
5. Go to checkout, press Submit with empty fields → red messages appear, nothing is sent.
6. Check the totals: with delivery, 3 shirts must show products €50 + shipping €5 = **€55**. Choose **store pickup** → shipping "Free", total **€50**, and the address fields disappear.
7. Fill the form with **your own** test data (try both bank transfer and IRIS) and submit. You should see the confirmation page with the amount to pay and your payment details, and the cart should be empty.
8. In Netlify → Forms → `langzi-order` the submission must appear with the order summary. Check the notification email arrived.
9. Switch off Wi-Fi/data on the phone, fill the form and submit → the site must say the order was **NOT** submitted and keep the cart.
10. Delete your test submission in Netlify.

---

## 13. Information the owner must provide before launch

- [ ] Real product list: photos, Greek/English names and descriptions, SKUs, stock per size
- [ ] Bank details for transfers (bank, account holder, IBAN, BIC) and the number/VAT used for IRIS
- [ ] Order notification email address (set in Netlify)
- [ ] Public email and store address (needed for the pickup address); confirm the phone hours (currently Mon–Fri 10:00–14:30)
- [ ] Payment deadline and what happens if an order is not paid (for the Shipping/Terms pages)
- [ ] Seller identity for the legal pages: legal name, VAT number (ΑΦΜ), tax office (ΔΟΥ), ΓΕΜΗ number if any, address, return address
- [ ] Returns procedure and who pays return shipping; refund method and timing
- [ ] Whether prices include VAT
- [ ] Size guide measurements (cm)
- [ ] Official logo file (optional)
- [ ] Analytics IDs + consent decision (optional)
- [ ] Final production URL (for `siteUrl`)
- [ ] Legal review of Privacy, Terms, Shipping, Returns, cookie information

## 14. Notes on SEO and structure

- Each page sets its own title, description and Open Graph tags. Cart/checkout/confirmation pages are `noindex`.
- English pages use `?lang=en` (the site is one page app with a language switch). hreflang and canonical links appear once `siteUrl` is set.
- `sitemap.xml` and `robots.txt` are created automatically by `npm run build` (the sitemap only when `siteUrl` is set, because sitemaps need full web addresses).
- Product structured data (JSON-LD) is **off** by default. Turn on `enableProductStructuredData` only when your real products and prices are final. No ratings or reviews are ever generated.
- Because the site is a single-page app, search engines see the page content only after running JavaScript. This is normal for modern engines but pre-rendering could be added later if SEO becomes a priority.

## 15. Adding online card payments later

Payments are manual today (bank transfer / IRIS confirmed by you). The checkout is separated from the cart and pricing logic. A later version can send the customer to a hosted checkout page of a payment provider after `Checkout.tsx` validation. Do not collect card numbers in this site's own forms.
