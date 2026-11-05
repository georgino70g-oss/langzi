/**
 * LANGZI — central site configuration.
 * Everything the owner needs to fill in lives here.
 * Anything left as `null` or '' is treated as "not configured yet" and is
 * NOT displayed (no fake contact or bank details are ever shown).
 */
export const siteConfig = {
  brandName: 'LANGZI',

  /**
   * Production URL WITHOUT trailing slash, e.g. 'https://langzi.netlify.app'.
   * Needed for canonical links, hreflang, sitemap.xml and Open Graph URLs.
   * TODO(owner): fill in after the first Netlify deploy.
   */
  siteUrl: '',

  currency: 'EUR',

  /**
   * Shipping fee in EUR, charged ONCE PER ORDER when the customer chooses delivery.
   * Store pickup is always free (the customer chooses it at checkout).
   * null = not configured (the site then says shipping is confirmed later and shows no grand total).
   */
  shippingCostEUR: 5 as number | null,

  /** Business / trader details. TODO(owner): complete before launch. Empty = hidden. */
  business: {
    legalName: 'LANGZI', // e.g. full name or company name of the seller
    vatNumber: '016472415', // ΑΦΜ 016472415
    taxOffice: 'ΔΟΥ ΑΜΠΕΛΟΚΗΠΩΝ', // ΔΟΥ ΑΜΠΕΛΟΚΗΠΩΝ
    gemiNumber: '168002104000', // ΓΕΜΗ (if applicable)
    address: 'ΜΑΡΑΣΛΗ 75, Τ.Κ. 54249, ΘΕΣΣΑΛΟΝΙΚΗ', // store address (also shown as the pickup address when filled in)
    returnAddress: '', // address for returns
    phone: '2310328128', // shown in the top bar and on the contact page
    email: 'taniskidis.g@gmail.com', // public contact email
    /** Full opening hours (contact page) and short version (top bar). Weekdays Mon–Fri. */
    openingHours: { el: 'Δευτέρα – Παρασκευή, 10:00–14:30', en: 'Monday – Friday, 10:00–14:30' },
    openingHoursShort: { el: 'Δευ–Παρ 10:00–14:30', en: 'Mon–Fri 10:00–14:30' },
  },

  /**
   * Payment details shown to the customer on the order-confirmation page.
   * Empty fields are hidden. If nothing is filled in, the customer is told the
   * payment details will be sent by the shop with the order confirmation.
   * TODO(owner): fill in your real bank details.
   */
  payment: {
    bankName: 'ΤΡΑΠΕΖΑ ΠΕΙΡΑΙΩΣ', // e.g. 'Bank of Greece'
    accountHolder: '',
    iban: 'GR5801722130005213108174899', // e.g. 'GR5801722130005213108174899'
    bic: '',
    irisId: '016472415', // phone number or VAT number that customers use to pay you via IRIS
  },

  /** Order notification email is configured in the Netlify dashboard (Forms > Notifications), not here. */

  /** Analytics. Leave empty = nothing is loaded. IDs only load AFTER the visitor accepts cookies. */
  analytics: {
    ga4MeasurementId: '', // e.g. 'G-XXXXXXXXXX'
    metaPixelId: '', // e.g. '1234567890'
  },

  /**
   * Product structured data (JSON-LD) is OFF by default because it must only
   * contain verified facts. Turn on only when real products, prices and stock are final.
   */
  enableProductStructuredData: false,

  /** Shows a "SAMPLE" badge on products that have `sample: true`. */
  showSampleBadges: true,

  /**
   * Size guide measurements in cm. null = not measured yet (shown as "—").
   * TODO(owner): measure your shirts and fill in. Never copy from other brands.
   */
  sizeGuide: [
    { size: 'M', chest: 58, length: 78, neck: '38-39' },
    { size: 'L', chest: 61, length: 79, neck: '40-41' },
    { size: 'XL', chest: 64, length: 80, neck: '42-43' },
    { size: 'XXL', chest: 67, length: 81, neck: '44-45' },
    { size: '3XL', chest: 70, length: 82, neck: '46-47' },
  ],
};

export type SiteConfig = typeof siteConfig;
