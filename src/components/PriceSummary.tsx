import type { CartLine, DeliveryMethod } from '../data/types';
import { siteConfig } from '../data/siteConfig';
import { useI18n } from '../context/I18nContext';
import { getBundleBreakdown, formatEuro } from '../utils/bundlePricing';
import { computeTotals } from '../utils/orderSummary';

interface Props {
  lines: CartLine[];
  deliveryMethod?: DeliveryMethod;
  /** In the cart the delivery method is not chosen yet: explain the pickup option. */
  showPickupHint?: boolean;
}

/** Shirts count, bundles applied, subtotal, shipping and the total (shown only when it can be computed). */
export default function PriceSummary({ lines, deliveryMethod = 'shipping', showPickupHint = false }: Props) {
  const { lang, t } = useI18n();
  const totals = computeTotals(lines, deliveryMethod);
  const breakdown = getBundleBreakdown(totals.shirts);
  const cost = siteConfig.shippingCostEUR;

  return (
    <section className="summary" aria-labelledby="summary-title">
      <h2 id="summary-title">{t('summary.title')}</h2>
      <dl className="summary__list">
        <div>
          <dt>{t('summary.shirts')}</dt>
          <dd>{totals.shirts}</dd>
        </div>
        {breakdown.lines.map((b) => (
          <div key={b.bundleSize} className="summary__sub">
            <dt>{t('summary.bundleLine', { count: b.count, size: b.bundleSize })}</dt>
            <dd>{formatEuro(b.subtotal, lang)}</dd>
          </div>
        ))}
        <div className="summary__strong">
          <dt>{t('summary.subtotal')}</dt>
          <dd>{formatEuro(totals.merchandiseSubtotal, lang)}</dd>
        </div>
        <div>
          <dt>{t('summary.shipping')}</dt>
          <dd>
            {deliveryMethod === 'pickup'
              ? t('summary.free')
              : totals.shippingConfigured
                ? formatEuro(totals.shippingCost as number, lang)
                : t('summary.shippingPending')}
          </dd>
        </div>
        <div className="summary__total">
          <dt>{t('summary.total')}</dt>
          <dd>{totals.total !== null ? formatEuro(totals.total, lang) : t('summary.totalPending')}</dd>
        </div>
      </dl>
      {showPickupHint && typeof cost === 'number' && <p className="muted small">{t('summary.shippingNote', { cost })}</p>}
      <p className="muted small">{t('summary.note')}</p>
    </section>
  );
}
