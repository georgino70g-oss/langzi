import { useId, useState } from 'react';
import type { Product, Size } from '../data/types';
import { SIZES } from '../data/types';
import { useI18n } from '../context/I18nContext';
import { useCart } from '../context/CartContext';
import { getAvailable } from '../utils/inventory';
import { Link } from '../router';

/** Size selector + add-to-cart button. A size MUST be chosen before adding. */
export default function AddToCart({ product }: { product: Product }) {
  const { t } = useI18n();
  const { add } = useCart();
  const groupName = useId();
  const [size, setSize] = useState<Size | null>(null);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const anyAvailable = SIZES.some((s) => getAvailable(product, s) > 0);

  const onAdd = () => {
    if (!size) {
      setMessage({ kind: 'error', text: t('product.selectSizeError') });
      return;
    }
    const result = add(product.id, size, 1);
    if (result.ok) {
      setMessage({ kind: 'ok', text: t('product.added') });
    } else if (result.problem === 'exceedsStock') {
      setMessage({ kind: 'error', text: t('product.maxReached') });
    } else {
      setMessage({ kind: 'error', text: t('product.cannotAdd') });
    }
  };

  return (
    <div className="add">
      <fieldset className="sizes">
        <legend>{t('product.sizes')}</legend>
        <div className="sizes__row">
          {SIZES.map((s) => {
            const available = getAvailable(product, s) > 0;
            return (
              <label
                key={s}
                className={`size ${available ? '' : 'size--off'} ${size === s ? 'size--on' : ''}`}
                title={available ? undefined : t('product.sizeUnavailable')}
              >
                <input
                  type="radio"
                  name={groupName}
                  value={s}
                  checked={size === s}
                  disabled={!available}
                  onChange={() => {
                    setSize(s);
                    setMessage(null);
                  }}
                  aria-label={available ? t('product.sizeLabel', { size: s }) : t('product.sizeUnavailableLabel', { size: s })}
                />
                <span aria-hidden="true">{s}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <button type="button" className="btn btn--primary btn--block" onClick={onAdd} disabled={!anyAvailable}>
        {anyAvailable ? t('product.add') : t('product.outOfStock')}
      </button>

      <p className={`add__msg ${message ? `add__msg--${message.kind}` : ''}`} role="status" aria-live="polite">
        {message?.text}
        {message?.kind === 'ok' && (
          <>
            {' '}
            <Link to="/cart">{t('product.viewCart')}</Link>
          </>
        )}
      </p>
    </div>
  );
}
