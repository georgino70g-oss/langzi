import { siteConfig } from '../data/siteConfig';

/**
 * Optional analytics. NOTHING is loaded unless (a) an ID is configured in siteConfig.ts
 * AND (b) the visitor accepted cookies via the consent banner.
 */
const CONSENT_KEY = 'langzi-consent';

export type Consent = 'granted' | 'denied' | null;

export const analyticsConfigured = (): boolean =>
  Boolean(siteConfig.analytics.ga4MeasurementId || siteConfig.analytics.metaPixelId);

export function getConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: 'granted' | 'denied'): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  if (value === 'granted') loadAnalytics();
}

let loaded = false;

export function loadAnalytics(): void {
  if (loaded || getConsent() !== 'granted') return;
  loaded = true;

  const ga = siteConfig.analytics.ga4MeasurementId;
  if (ga) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`;
    document.head.appendChild(s);
    const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
    w.gtag('js', new Date());
    w.gtag('config', ga);
  }

  const px = siteConfig.analytics.metaPixelId;
  if (px) {
    const s = document.createElement('script');
    s.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${px.replace(/[^0-9]/g, '')}');fbq('track','PageView');`;
    document.head.appendChild(s);
  }
}
