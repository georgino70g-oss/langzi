import { useEffect, useState } from 'react';
import { Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { useCart } from '../context/CartContext';
import { Link, useRouter } from '../router';
import { BUNDLE_PRICES } from '../utils/bundlePricing';
import { siteConfig } from '../data/siteConfig';
import Logo from './Logo';

export default function Header() {
  const { lang, setLang, t } = useI18n();
  const { count } = useCart();
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const phone = siteConfig.business.phone;

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const nav = [
    { to: '/', label: t('nav.home') },
    { to: '/products', label: t('nav.products') },
    { to: '/size-guide', label: t('nav.sizeGuide') },
    { to: '/shipping', label: t('nav.shipping') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <div className="announce">
        <p>{t('announce.text', { p1: BUNDLE_PRICES[1], p2: BUNDLE_PRICES[2], p3: BUNDLE_PRICES[3] })}</p>
        {phone && (
          <p className="announce__phone">
            <Phone size={14} aria-hidden="true" />
            <a href={`tel:+30${phone.replace(/\D/g, '').replace(/^30/, '')}`} aria-label={t('announce.phoneLabel', { phone })}>
              {phone}
            </a>
            <span aria-hidden="true"> · </span>
            <span>{siteConfig.business.openingHoursShort[lang]}</span>
          </p>
        )}
      </div>
      <header className="header">
        <div className="container header__inner">
          <Logo />
          <nav id="main-nav" className={`nav ${open ? 'nav--open' : ''}`} aria-label={t('nav.main')}>
            <ul>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} aria-current={path === n.to ? 'page' : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__tools">
            <div className="lang" role="group" aria-label={t('nav.language')}>
              {(['el', 'en'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  className={lang === l ? 'is-active' : ''}
                  aria-pressed={lang === l}
                  lang={l}
                  onClick={() => setLang(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Link to="/cart" className="cartlink" aria-label={t('nav.cartCount', { n: count })}>
              <ShoppingBag aria-hidden="true" size={22} />
              <span className="cartlink__count" aria-hidden="true">
                {count}
              </span>
            </Link>
            <button
              type="button"
              className="menubtn"
              aria-expanded={open}
              aria-controls="main-nav"
              aria-label={open ? t('nav.closeMenu') : t('nav.menu')}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
