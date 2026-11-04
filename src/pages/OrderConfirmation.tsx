import { useI18n } from '../context/I18nContext';
import { siteConfig } from '../data/siteConfig';
import { formatEuro } from '../utils/bundlePricing';
import { useSeo } from '../utils/seo';
import { Link } from '../router';
import type { DeliveryMethod, PaymentMethod } from '../data/types';
import { ORDER_DONE_KEY } from './Checkout';

interface Done {
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  total: number | null;
}

/** The flag holds only payment/delivery choice and the amount — no personal data. */
function readDone(): Done | null {
  try {
    const raw = window.sessionStorage.getItem(ORDER_DONE_KEY);
    return raw ? (JSON.parse(raw) as Done) : null;
  } catch {
    return null;
  }
}

export default function OrderConfirmation() {
  const { lang, t } = useI18n();
  useSeo({ title: t('confirm.title'), description: t('confirm.text'), path: '/order-confirmation', lang, noindex: true });

  const done = readDone();
  if (!done) {
    return (
      <div className="container page center">
        <p>{t('confirm.none')}</p>
        <Link to="/" className="btn btn--primary">
          {t('confirm.home')}
        </Link>
      </div>
    );
  }

  const p = siteConfig.payment;
  const hasBank = Boolean(p.iban);
  const hasIris = Boolean(p.irisId);
  const configured = done.paymentMethod === 'bank_transfer' ? hasBank : hasIris;

  return (
    <div className="container page narrow">
      <h1>{t('confirm.title')}</h1>
      <p role="status">{t('confirm.text')}</p>

      {done.deliveryMethod === 'pickup' && <p>{t('confirm.pickup')}</p>}

      <section className="summary" aria-labelledby="pay-title">
        <h2 id="pay-title">
          {t('confirm.payTitle')} — {done.paymentMethod === 'bank_transfer' ? t('confirm.bankTitle') : t('confirm.irisTitle')}
        </h2>
        {done.total !== null && (
          <p>
            {t('confirm.amount')}: <strong>{formatEuro(done.total, lang)}</strong>
          </p>
        )}
        {configured ? (
          <dl className="summary__list">
            {done.paymentMethod === 'bank_transfer' ? (
              <>
                {p.bankName && (
                  <div>
                    <dt>{t('confirm.bank')}</dt>
                    <dd>{p.bankName}</dd>
                  </div>
                )}
                {p.accountHolder && (
                  <div>
                    <dt>{t('confirm.holder')}</dt>
                    <dd>{p.accountHolder}</dd>
                  </div>
                )}
                <div>
                  <dt>IBAN</dt>
                  <dd>{p.iban}</dd>
                </div>
                {p.bic && (
                  <div>
                    <dt>BIC/SWIFT</dt>
                    <dd>{p.bic}</dd>
                  </div>
                )}
              </>
            ) : (
              <div>
                <dt>{t('confirm.irisId')}</dt>
                <dd>{p.irisId}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p>{t('confirm.detailsPending')}</p>
        )}
        <p className="notice">{t('confirm.payWait')}</p>
      </section>

      <p className="center">
        <Link to="/" className="btn btn--primary">
          {t('confirm.home')}
        </Link>
      </p>
    </div>
  );
}
