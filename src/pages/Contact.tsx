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
  const pay = siteConfig.payment;
  const hasPay = Boolean(pay.iban || pay.irisId);
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
          {hasPay && (
            <section aria-labelledby="contact-pay">
              <h2 id="contact-pay">{t('contact.payTitle')}</h2>
              <p>{t('contact.payIntro')}</p>
              <dl className="contact">
                {pay.bankName && (
                  <div>
                    <dt>{t('confirm.bank')}</dt>
                    <dd>{pay.bankName}</dd>
                  </div>
                )}
                {pay.accountHolder && (
                  <div>
                    <dt>{t('confirm.holder')}</dt>
                    <dd>{pay.accountHolder}</dd>
                  </div>
                )}
                {pay.iban && (
                  <div>
                    <dt>IBAN</dt>
                    <dd>{pay.iban}</dd>
                  </div>
                )}
                {pay.bic && (
                  <div>
                    <dt>BIC/SWIFT</dt>
                    <dd>{pay.bic}</dd>
                  </div>
                )}
                {pay.irisId && (
                  <div>
                    <dt>{t('confirm.irisId')}</dt>
                    <dd>{pay.irisId}</dd>
                  </div>
                )}
              </dl>
            </section>
          )}
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
