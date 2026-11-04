import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { useCart } from '../context/CartContext';
import { getProduct } from '../data/products';
import { getAvailable } from '../utils/inventory';
import { useSeo } from '../utils/seo';
import { Link } from '../router';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductImage from '../components/ProductImage';
import PriceSummary from '../components/PriceSummary';

export default function Cart() {
  const { lang, t } = useI18n();
  const { lines, issues, setQty, remove, clear } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);
  useSeo({ title: t('cart.title'), description: t('seo.cart.desc'), path: '/cart', lang, noindex: true });

  if (lines.length === 0) {
    return (
      <div className="container page center">
        <h1>{t('cart.empty')}</h1>
        <p>{t('cart.emptyText')}</p>
        <Link to="/products" className="btn btn--primary btn--lg">
          {t('cart.shop')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: t('cart.title') }]} />
      <h1>{t('cart.title')}</h1>

      {issues.length > 0 && (
        <div className="alert alert--error" role="alert">
          <strong>{t('cart.issuesTitle')}</strong>
          <ul>
            {issues.map((i) => {
              const p = getProduct(i.productId);
              return (
                <li key={`${i.productId}-${i.size}`}>
                  {t(`cart.issue.${i.problem}` as 'cart.issue.inactive', {
                    name: p ? p.name[lang] : i.productId,
                    size: i.size,
                    available: i.available,
                  })}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="cart">
        <ul className="cart__lines">
          {lines.map((l) => {
            const p = getProduct(l.productId);
            const name = p ? p.name[lang] : l.productId;
            const max = getAvailable(p, l.size);
            return (
              <li key={`${l.productId}-${l.size}`} className="line">
                <div className="line__img">
                  <ProductImage fileName={p?.image} alt={name} accent={p?.accent} />
                </div>
                <div className="line__info">
                  <h2 className="line__title">{p ? <Link to={`/products/${p.id}`}>{name}</Link> : name}</h2>
                  <p className="muted small">
                    {t('product.sku')}: {p?.sku ?? '—'} · {t('cart.size')}: <strong>{l.size}</strong>
                  </p>
                  <div className="line__controls">
                    <div className="qty" role="group" aria-label={t('cart.qty')}>
                      <button
                        type="button"
                        aria-label={t('cart.decrease', { name, size: l.size })}
                        disabled={l.qty <= 1}
                        onClick={() => setQty(l.productId, l.size, l.qty - 1)}
                      >
                        <Minus size={16} aria-hidden="true" />
                      </button>
                      <output aria-live="polite">{l.qty}</output>
                      <button
                        type="button"
                        aria-label={t('cart.increase', { name, size: l.size })}
                        disabled={l.qty >= max}
                        onClick={() => setQty(l.productId, l.size, l.qty + 1)}
                      >
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="linkbtn"
                      aria-label={t('cart.removeLabel', { name, size: l.size })}
                      onClick={() => remove(l.productId, l.size)}
                    >
                      <Trash2 size={16} aria-hidden="true" /> {t('cart.remove')}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="cart__side">
          <PriceSummary lines={lines} />
          {issues.length === 0 ? (
            <Link to="/checkout" className="btn btn--primary btn--block btn--lg">
              {t('cart.checkout')}
            </Link>
          ) : (
            <button type="button" className="btn btn--primary btn--block btn--lg" disabled>
              {t('cart.checkout')}
            </button>
          )}
          <Link to="/products" className="btn btn--block">
            {t('cart.continue')}
          </Link>
          {confirmClear ? (
            <div className="confirm" role="alertdialog" aria-label={t('cart.clearConfirm')}>
              <p>{t('cart.clearConfirm')}</p>
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => {
                  clear();
                  setConfirmClear(false);
                }}
              >
                {t('cart.clearYes')}
              </button>
              <button type="button" className="btn" onClick={() => setConfirmClear(false)}>
                {t('cart.clearNo')}
              </button>
            </div>
          ) : (
            <button type="button" className="linkbtn" onClick={() => setConfirmClear(true)}>
              {t('cart.clear')}
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
