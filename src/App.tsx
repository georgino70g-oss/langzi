import { useEffect, useRef } from 'react';
import { RouterProvider, useRouter } from './router';
import { I18nProvider, useI18n } from './context/I18nContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import SizeGuide from './pages/SizeGuide';
import LegalPage from './pages/LegalPage';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function Routes() {
  const { path } = useRouter();
  if (path === '/') return <Home />;
  if (path === '/products') return <Products />;
  if (path.startsWith('/products/')) return <ProductDetail id={decodeURIComponent(path.slice('/products/'.length))} />;
  if (path === '/cart') return <Cart />;
  if (path === '/checkout') return <Checkout />;
  if (path === '/order-confirmation') return <OrderConfirmation />;
  if (path === '/size-guide') return <SizeGuide />;
  if (path === '/shipping') return <LegalPage docKey="shipping" path={path} />;
  if (path === '/returns') return <LegalPage docKey="returns" path={path} />;
  if (path === '/privacy') return <LegalPage docKey="privacy" path={path} />;
  if (path === '/terms') return <LegalPage docKey="terms" path={path} />;
  if (path === '/contact') return <Contact />;
  return <NotFound />;
}

function Shell() {
  const { t } = useI18n();
  const { path } = useRouter();
  const main = useRef<HTMLElement>(null);
  const first = useRef(true);

  // Move keyboard focus to the main area after navigation (accessibility).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    main.current?.focus({ preventScroll: true });
  }, [path]);

  return (
    <>
      <a href="#main" className="skip">
        {t('skip')}
      </a>
      <Header />
      <main id="main" ref={main} tabIndex={-1}>
        <Routes />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <CartProvider>
        <RouterProvider>
          <Shell />
        </RouterProvider>
      </CartProvider>
    </I18nProvider>
  );
}
