import { useEffect, useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { Link } from '../router';
import { analyticsConfigured, getConsent, loadAnalytics, setConsent } from '../utils/analytics';

/** Rendered only when an analytics/pixel ID is configured. Nothing loads before "Accept". */
export default function CookieConsent() {
  const { t } = useI18n();
  const [choice, setChoice] = useState(getConsent());

  useEffect(() => {
    if (analyticsConfigured() && choice === 'granted') loadAnalytics();
  }, [choice]);

  if (!analyticsConfigured() || choice !== null) return null;

  const decide = (v: 'granted' | 'denied') => {
    setConsent(v);
    setChoice(v);
  };

  return (
    <div className="consent" role="region" aria-label="Cookies">
      <p>
        {t('cookie.text')} <Link to="/privacy">{t('cookie.more')}</Link>
      </p>
      <div className="consent__btns">
        <button type="button" className="btn" onClick={() => decide('denied')}>
          {t('cookie.decline')}
        </button>
        <button type="button" className="btn btn--primary" onClick={() => decide('granted')}>
          {t('cookie.accept')}
        </button>
      </div>
    </div>
  );
}
