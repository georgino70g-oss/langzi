import { useI18n } from '../context/I18nContext';
import { activeProducts } from '../data/products';
import { BUNDLE_PRICES } from '../utils/bundlePricing';
import { useSeo } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { lang, t } = useI18n();
  useSeo({ title: t('products.title'), description: t('seo.products.desc'), path: '/products', lang });
  const list = activeProducts();

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: t('products.title') }]} />
      <h1>{t('products.title')}</h1>
      <p className="muted">{t('products.sub', { n: list.length })}</p>
      <p className="notice">{t('product.bundleHint', { p1: BUNDLE_PRICES[1], p2: BUNDLE_PRICES[2], p3: BUNDLE_PRICES[3] })}</p>
      {list.length === 0 ? (
        <p>{t('products.empty')}</p>
      ) : (
        <div className="grid">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} eager={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
