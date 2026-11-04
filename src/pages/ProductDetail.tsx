import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { getProduct } from '../data/products';
import { siteConfig } from '../data/siteConfig';
import { SIZES } from '../data/types';
import { BUNDLE_PRICES } from '../utils/bundlePricing';
import { getAvailable } from '../utils/inventory';
import { resolveImage } from '../utils/images';
import { useSeo } from '../utils/seo';
import { Link } from '../router';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductImage from '../components/ProductImage';
import AddToCart from '../components/AddToCart';
import NotFound from './NotFound';

export default function ProductDetail({ id }: { id: string }) {
  const { lang, t } = useI18n();
  const product = getProduct(id);
  const visible = product && product.active ? product : undefined;
  const [active, setActive] = useState(0);
  useEffect(() => setActive(0), [id]);

  const jsonLd = useMemo(() => {
    // Only emitted when the owner explicitly enables it AND the product is not sample data.
    if (!visible || !siteConfig.enableProductStructuredData || visible.sample) return null;
    const inStock = SIZES.some((s) => getAvailable(visible, s) > 0);
    const base = siteConfig.siteUrl.replace(/\/$/, '');
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: visible.name[lang],
      sku: visible.sku,
      description: visible.description[lang],
      brand: { '@type': 'Brand', name: siteConfig.brandName },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price: BUNDLE_PRICES[1],
        availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: base ? `${base}/products/${visible.id}` : undefined,
      },
    };
  }, [visible, lang]);

  useSeo({
    title: visible ? visible.name[lang] : t('product.notFound'),
    description: visible ? visible.description[lang] : t('product.notFoundText'),
    path: `/products/${id}`,
    lang,
    noindex: !visible,
    jsonLd,
  });

  if (!visible) {
    return (
      <NotFound title={t('product.notFound')} text={t('product.notFoundText')} backTo="/products" backLabel={t('product.back')} />
    );
  }

  const name = visible.name[lang];
  const files = [visible.image, ...(visible.images ?? [])];
  const hasPhotos = files.some((f) => resolveImage(f));

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: t('products.title'), to: '/products' }, { label: name }]} />
      <div className="detail">
        <div className="detail__gallery" role="group" aria-label={t('product.gallery')}>
          <div className="detail__main">
            <ProductImage fileName={files[active]} alt={name} accent={visible.accent} eager />
          </div>
          {files.length > 1 && hasPhotos && (
            <ul className="thumbs">
              {files.map((f, i) => (
                <li key={f}>
                  <button
                    type="button"
                    className={i === active ? 'is-active' : ''}
                    aria-label={t('product.photo', { n: i + 1 })}
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                  >
                    <ProductImage fileName={f} alt="" accent={visible.accent} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="detail__info">
          <h1>{name}</h1>
          <p className="muted">
            {t('product.sku')}: {visible.sku}
          </p>
          {visible.sample && siteConfig.showSampleBadges && <p className="notice">{t('product.sampleNote')}</p>}
          <p>{visible.description[lang]}</p>
          <p className="notice">{t('product.bundleHint', { p1: BUNDLE_PRICES[1], p2: BUNDLE_PRICES[2], p3: BUNDLE_PRICES[3] })}</p>
          <AddToCart product={visible} />
          <p className="muted small">{t('product.stockNote')}</p>
          <p>
            <Link to="/size-guide">{t('nav.sizeGuide')}</Link> · <Link to="/products">{t('product.back')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
