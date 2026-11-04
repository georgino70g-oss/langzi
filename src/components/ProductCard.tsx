import type { Product } from '../data/types';
import { siteConfig } from '../data/siteConfig';
import { useI18n } from '../context/I18nContext';
import { Link } from '../router';
import ProductImage from './ProductImage';
import AddToCart from './AddToCart';

export default function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const { lang, t } = useI18n();
  const name = product.name[lang];
  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card__media" aria-label={`${name} — ${t('product.viewDetails')}`}>
        <ProductImage fileName={product.image} alt={name} accent={product.accent} eager={eager} />
        {product.sample && siteConfig.showSampleBadges && <span className="badge">{t('product.sample')}</span>}
      </Link>
      <div className="card__body">
        <h3 className="card__title">
          <Link to={`/products/${product.id}`}>{name}</Link>
        </h3>
        <p className="card__sku">
          {t('product.sku')}: {product.sku}
        </p>
        <AddToCart product={product} />
      </div>
    </article>
  );
}
