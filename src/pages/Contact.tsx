import { useI18n } from '../context/I18nContext';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../utils/seo';
import { Link } from '../router';
import Breadcrumbs from '../components/Breadcrumbs';

/** Only configured details are shown. Nothing is invented and no empty call/email buttons appear. */
export default function Contact() {
  const { lang, t } = useI18n();
  useSeo({ title: t('contact.title'), description: t('seo.contact.desc'), path: '/contact', lang });
  const b = siteConfig.business;
  const hasAny = Boolean(b.phone || b.email || b.address || b.openingHours.el);

  return (
    <div className="container page narrow">
      <Breadcrumbs items={[{ label: t('contact.title') }]} />
      <h1>{t('contact.title')}</h1>
      {hasAny ? (
        <>
          <p>{t('contact.intro')}</p>
          <dl className="contact">
            {b.phone && (
              <div>
                <dt>{t('contact.phone')}</dt>
                <dd>
                  <a href={`tel:+30${b.phone.replace(/\D/g, '').replace(/^30/, '')}`}>{b.phone}</a>
                </dd>
              </div>
            )}
            {b.email && (
              <div>
                <dt>{t('contact.email')}</dt>
                <dd>
                  <a href={`mailto:${b.email}`}>{b.email}</a>
                </dd>
              </div>
            )}
            {b.address && (
              <div>
                <dt>{t('contact.address')}</dt>
                <dd>{b.address}</dd>
              </div>
            )}
            {b.openingHours[lang] && (
              <div>
                <dt>{t('contact.hours')}</dt>
                <dd>{b.openingHours[lang]}</dd>
              </div>
            )}
          </dl>
        </>
      ) : (
        <p className="notice">{t('contact.notConfigured')}</p>
      )}
      <Link to="/products" className="btn btn--primary">
        {t('contact.orderCta')}
      </Link>
    </div>
  );
}
