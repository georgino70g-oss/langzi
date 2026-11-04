import { useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useI18n } from '../context/I18nContext';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../utils/seo';
import { Link, useRouter } from '../router';
import { validateCart } from '../utils/inventory';
import { buildOrderSummaryText, computeTotals } from '../utils/orderSummary';
import { emptyCheckout, validateCheckout } from '../utils/validation';
import type { CheckoutErrors, CheckoutValues } from '../utils/validation';
import Breadcrumbs from '../components/Breadcrumbs';
import PriceSummary from '../components/PriceSummary';

export const FORM_NAME = 'langzi-order';
export const ORDER_DONE_KEY = 'langzi-order-done';

const encode = (data: Record<string, string>) =>
  new URLSearchParams(Object.entries(data)).toString();

type Status = 'idle' | 'submitting' | 'network' | 'rejected';

export default function Checkout() {
  const { lang, t } = useI18n();
  const { lines, issues, clear } = useCart();
  const { navigate } = useRouter();
  const [values, setValues] = useState<CheckoutValues>(emptyCheckout);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  useSeo({ title: t('checkout.title'), description: t('seo.checkout.desc'), path: '/checkout', lang, noindex: true });

  if (lines.length === 0) {
    return (
      <div className="container page center">
        <h1>{t('checkout.empty')}</h1>
        <Link to="/products" className="btn btn--primary">
          {t('cart.shop')}
        </Link>
      </div>
    );
  }

  const isShipping = values.deliveryMethod === 'shipping';
  const shippingCost = siteConfig.shippingCostEUR;

  const set = <K extends keyof CheckoutValues>(key: K, value: CheckoutValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    // 1. Validate the form.
    const found = validateCheckout(values);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    // 2. Re-validate the cart against the CURRENT catalog right before submitting.
    if (validateCart(lines).length > 0) {
      navigate('/cart');
      return;
    }

    // 3. Submit through Netlify Forms (URL-encoded POST; field names match public/__forms.html).
    const totals = computeTotals(lines, values.deliveryMethod);
    const payload: Record<string, string> = {
      'form-name': FORM_NAME,
      'bot-field': (formRef.current?.elements.namedItem('bot-field') as HTMLInputElement | null)?.value ?? '',
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      // Address fields are not collected for store pickup.
      address: isShipping ? values.address.trim() : '',
      postalCode: isShipping ? values.postalCode.trim() : '',
      city: isShipping ? values.city.trim() : '',
      region: isShipping ? values.region.trim() : '',
      deliveryNotes: values.deliveryNotes.trim(),
      deliveryMethod: isShipping ? 'shipping' : 'store_pickup',
      paymentMethod: values.paymentMethod,
      orderSummary: buildOrderSummaryText(lines),
      totalShirts: String(totals.shirts),
      merchandiseSubtotal: `${totals.merchandiseSubtotal} EUR`,
      shippingStatus: totals.shippingConfigured
        ? `${totals.shippingCost} EUR${isShipping ? '' : ' (store pickup)'}`
        : 'NOT CONFIGURED - to be confirmed with customer',
      displayedTotal: totals.total !== null ? `${totals.total} EUR` : 'Not shown (shipping to be confirmed)',
      language: lang,
      consent: 'yes',
    };

    setStatus('submitting');

    // Local dev server has no Netlify Forms. Never pretend an order was sent.
    if (import.meta.env.DEV) {
      setStatus('network');
      return;
    }

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });
      if (!res.ok) {
        setStatus('rejected');
        return;
      }
      try {
        // Only the payment/delivery choice and amount: no personal data.
        window.sessionStorage.setItem(
          ORDER_DONE_KEY,
          JSON.stringify({ paymentMethod: values.paymentMethod, deliveryMethod: values.deliveryMethod, total: totals.total }),
        );
      } catch {
        /* ignore */
      }
      clear(); // cart is cleared ONLY after confirmed success
      setStatus('idle');
      navigate('/order-confirmation');
    } catch {
      setStatus('network');
    }
  };

  const consentLabel = t('checkout.consent')
    .split(/(<privacy>.*?<\/privacy>|<terms>.*?<\/terms>)/g)
    .map((part, i): ReactNode => {
      const m = part.match(/^<(privacy|terms)>(.*)<\/\1>$/);
      if (!m) return part;
      return (
        <Link key={i} to={m[1] === 'privacy' ? '/privacy' : '/terms'} target="_blank" rel="noopener">
          {m[2]}
        </Link>
      );
    });

  type TextField = Exclude<keyof CheckoutValues, 'consent' | 'deliveryMethod' | 'paymentMethod'>;
  const field = (
    name: TextField,
    label: string,
    opts: { type?: string; autoComplete?: string; inputMode?: 'tel' | 'numeric' | 'email' | 'text'; textarea?: boolean; required?: boolean } = {},
  ) => {
    const err = errors[name];
    const id = `f-${name}`;
    const common = {
      id,
      name,
      value: values[name],
      autoComplete: opts.autoComplete,
      'aria-invalid': err ? true : undefined,
      'aria-describedby': err ? `${id}-err` : undefined,
      'aria-required': opts.required ? true : undefined,
    };
    return (
      <div className={`field ${err ? 'field--error' : ''}`}>
        <label htmlFor={id}>{label}{opts.required && <span aria-hidden="true"> *</span>}</label>
        {opts.textarea ? (
          <textarea {...common} rows={3} onChange={(e) => set(name, e.target.value)} />
        ) : (
          <input {...common} type={opts.type ?? 'text'} inputMode={opts.inputMode} onChange={(e) => set(name, e.target.value)} />
        )}
        {err && (
          <p id={`${id}-err`} className="field__error" role="alert">
            {t(err)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: t('cart.title'), to: '/cart' }, { label: t('checkout.title') }]} />
      <h1>{t('checkout.title')}</h1>

      {issues.length > 0 && (
        <div className="alert alert--error" role="alert">
          <p>{t('checkout.errorCart')}</p>
          <Link to="/cart" className="btn">
            {t('checkout.fixCart')}
          </Link>
        </div>
      )}

      <div className="cart">
        <form ref={formRef} onSubmit={onSubmit} noValidate className="form" name={FORM_NAME}>
          <input type="hidden" name="form-name" value={FORM_NAME} />
          {/* Honeypot: real visitors never see or fill this; bots do. */}
          <p className="hp" aria-hidden="true">
            <label>
              Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <fieldset>
            <legend>{t('checkout.customer')}</legend>
            {field('fullName', t('checkout.fullName'), { autoComplete: 'name', required: true })}
            {field('phone', t('checkout.phone'), { type: 'tel', inputMode: 'tel', autoComplete: 'tel', required: true })}
            {field('email', t('checkout.email'), { type: 'email', inputMode: 'email', autoComplete: 'email' })}
          </fieldset>

          <fieldset>
            <legend>{t('checkout.deliveryMethod')}</legend>
            <label className="radio">
              <input
                type="radio"
                name="deliveryMethod"
                value="shipping"
                checked={isShipping}
                onChange={() => set('deliveryMethod', 'shipping')}
              />
              <span>{t('checkout.method.shipping', { cost: typeof shippingCost === 'number' ? shippingCost : '—' })}</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="deliveryMethod"
                value="pickup"
                checked={!isShipping}
                onChange={() => set('deliveryMethod', 'pickup')}
              />
              <span>{t('checkout.method.pickup')}</span>
            </label>
            {!isShipping && (
              <p className="muted small">
                {t('checkout.pickupNote')}
                {siteConfig.business.address && ` ${t('checkout.pickupAt', { address: siteConfig.business.address })}`}
              </p>
            )}
          </fieldset>

          {isShipping && (
            <fieldset>
              <legend>{t('checkout.delivery')}</legend>
              {field('address', t('checkout.address'), { autoComplete: 'street-address', required: true })}
              <div className="field-row">
                {field('postalCode', t('checkout.postalCode'), { inputMode: 'numeric', autoComplete: 'postal-code', required: true })}
                {field('city', t('checkout.city'), { autoComplete: 'address-level2', required: true })}
              </div>
              {field('region', t('checkout.region'), { autoComplete: 'address-level1' })}
            </fieldset>
          )}

          <fieldset>
            <legend>{t('checkout.notes')}</legend>
            {field('deliveryNotes', t('checkout.notes'), { textarea: true })}
          </fieldset>

          <fieldset>
            <legend>{t('checkout.payment')}</legend>
            <label className="radio">
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={values.paymentMethod === 'bank_transfer'}
                onChange={() => set('paymentMethod', 'bank_transfer')}
              />
              <span>{t('checkout.payBank')}</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="paymentMethod"
                value="iris"
                checked={values.paymentMethod === 'iris'}
                onChange={() => set('paymentMethod', 'iris')}
              />
              <span>{t('checkout.payIris')}</span>
            </label>
            <p className="muted small">{t('checkout.payNote')}</p>
          </fieldset>

          <div className={`field field--check ${errors.consent ? 'field--error' : ''}`}>
            <label>
              <input
                type="checkbox"
                name="consent"
                checked={values.consent}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? 'f-consent-err' : undefined}
                onChange={(e) => set('consent', e.target.checked)}
              />
              <span>{consentLabel}</span>
            </label>
            {errors.consent && (
              <p id="f-consent-err" className="field__error" role="alert">
                {t(errors.consent)}
              </p>
            )}
          </div>
          <p className="muted small">{t('checkout.dataNote')}</p>

          {Object.keys(errors).some((k) => errors[k as keyof CheckoutErrors]) && (
            <p className="alert alert--error" role="alert">
              {t('checkout.errorFix')}
            </p>
          )}
          {(status === 'network' || status === 'rejected') && (
            <p className="alert alert--error" role="alert">
              {import.meta.env.DEV
                ? 'DEV MODE: Netlify Forms only work on a deployed Netlify site. No order was sent.'
                : status === 'network'
                  ? t('checkout.errorNetwork')
                  : t('checkout.errorRejected')}
            </p>
          )}

          <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'submitting' || issues.length > 0}>
            {status === 'submitting' ? t('checkout.submitting') : t('checkout.submit')}
          </button>
          <p className="muted small">{t('checkout.reviewNote')}</p>
        </form>

        <aside className="cart__side">
          <PriceSummary lines={lines} deliveryMethod={values.deliveryMethod} />
          <Link to="/cart" className="btn btn--block">
            {t('checkout.back')}
          </Link>
        </aside>
      </div>
    </div>
  );
}
