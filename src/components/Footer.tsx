import { useI18n } from '../context/I18nContext';
import { Link } from '../router';
import { siteConfig } from '../data/siteConfig';
import Logo from './Logo';

export default function Footer() {
  const { t } = useI18n();
  const b = siteConfig.business;
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo />
          <p className="muted">{t('footer.tagline')}</p>
        </div>
        <div>
          <h2 className="footer__h">{t('footer.shop')}</h2>
          <ul>
            <li><Link to="/products">{t('nav.products')}</Link></li>
            <li><Link to="/cart">{t('nav.cart')}</Link></li>
            <li><Link to="/size-guide">{t('nav.sizeGuide')}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer__h">{t('footer.info')}</h2>
          <ul>
            <li><Link to="/shipping">{t('footer.shipping')}</Link></li>
            <li><Link to="/returns">{t('footer.returns')}</Link></li>
            <li><Link to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer__h">{t('footer.legal')}</h2>
          <ul>
            <li><Link to="/privacy">{t('footer.privacy')}</Link></li>
            <li><Link to="/terms">{t('footer.terms')}</Link></li>
          </ul>
          {(b.legalName || b.vatNumber) && (
            <p className="muted small">
              {b.legalName}
              {b.vatNumber && ` · ΑΦΜ/VAT ${b.vatNumber}`}
            </p>
          )}
        </div>
      </div>
      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {siteConfig.brandName}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
