import { useI18n } from '../context/I18nContext';
import { Link } from '../router';
import { activeProducts } from '../data/products';
import { siteConfig } from '../data/siteConfig';
import { BUNDLE_PRICES, calculateBundleTotal, formatEuro } from '../utils/bundlePricing';
import { useSeo } from '../utils/seo';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { lang, t } = useI18n();
  const p = { p1: BUNDLE_PRICES[1], p2: BUNDLE_PRICES[2], p3: BUNDLE_PRICES[3] };
  const cost = siteConfig.shippingCostEUR ?? '—';
  useSeo({ title: t('seo.home.title'), description: t('seo.home.desc', p), path: '/', lang });

  const all = activeProducts();
  const featured = all.filter((x) => x.featured).slice(0, 4);
  const shown = featured.length > 0 ? featured : all.slice(0, 4);
  const b = siteConfig.business;
  const hasContact = Boolean(b.phone || b.email || b.address);

  const offers = [
    { label: t('offers.one'), price: BUNDLE_PRICES[1] },
    { label: t('offers.two'), price: BUNDLE_PRICES[2] },
    { label: t('offers.three'), price: BUNDLE_PRICES[3], highlight: true },
  ];

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1>{t('hero.title')}</h1>
          <p className="hero__sub">{t('hero.sub')}</p>
          <div className="hero__cta">
            <Link to="/products" className="btn btn--primary btn--lg">
              {t('hero.cta')}
            </Link>
            <Link to="/#how" className="btn btn--lg">
              {t('hero.cta2')}
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="offers-title">
        <div className="container">
          <h2 id="offers-title">{t('offers.title')}</h2>
          <p className="muted">{t('offers.sub')}</p>
          <ul className="offers">
            {offers.map((o) => (
              <li key={o.label} className={`offer ${o.highlight ? 'offer--hl' : ''}`}>
                <span className="offer__label">{o.label}</span>
                <span className="offer__price">{formatEuro(o.price, lang)}</span>
              </li>
            ))}
          </ul>
          <p className="muted small">{t('offers.note', { cost })}</p>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="featured-title">
        <div className="container">
          <h2 id="featured-title">{t('featured.title')}</h2>
          {shown.length === 0 ? (
            <p>{t('products.empty')}</p>
          ) : (
            <div className="grid">
              {shown.map((prod, i) => (
                <ProductCard key={prod.id} product={prod} eager={i < 2} />
              ))}
            </div>
          )}
          <p className="center">
            <Link to="/products" className="btn">
              {t('featured.cta')}
            </Link>
          </p>
        </div>
      </section>

      <section className="section" id="how" aria-labelledby="how-title">
        <div className="container two-col">
          <div>
            <h2 id="how-title">{t('how.title')}</h2>
            <p>{t('how.intro')}</p>
            <ol className="steps">
              <li>{t('how.step1')}</li>
              <li>{t('how.step2', p)}</li>
              <li>{t('how.step3')}</li>
            </ol>
          </div>
          <div>
            <table className="table">
              <caption>{t('how.tableTitle')}</caption>
              <thead>
                <tr>
                  <th scope="col">{t('how.colQty')}</th>
                  <th scope="col">{t('how.colPrice')}</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((q) => (
                  <tr key={q}>
                    <th scope="row">{q}</th>
                    <td>{formatEuro(calculateBundleTotal(q), lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="sizecta-title">
        <div className="container cta-row">
          <div>
            <h2 id="sizecta-title">{t('sizeCta.title')}</h2>
            <p>{t('sizeCta.text')}</p>
          </div>
          <Link to="/size-guide" className="btn btn--primary">
            {t('sizeCta.btn')}
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="ship-title">
        <div className="container">
          <h2 id="ship-title">{t('ship.title')}</h2>
          <ul className="ticks">
            <li>{t('ship.pay')}</li>
            <li>{t('ship.separate', { cost })}</li>
            <li>{t('ship.confirm')}</li>
          </ul>
          <Link to="/shipping">{t('ship.more')}</Link>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="faq-title" id="faq">
        <div className="container narrow">
          <h2 id="faq-title">{t('faq.title')}</h2>
          {([1, 2, 3, 4, 5, 6] as const).map((n) => (
            <details key={n} className="faq">
              <summary>{t(`faq.q${n}` as 'faq.q1')}</summary>
              <p>{t(`faq.a${n}` as 'faq.a1', { cost })}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="contact-title">
        <div className="container narrow">
          <h2 id="contact-title">{t('contact.title')}</h2>
          <p>{hasContact ? t('contact.intro') : t('contact.notConfigured')}</p>
          <Link to="/contact" className="btn">
            {t('nav.contact')}
          </Link>
        </div>
      </section>
    </>
  );
}
