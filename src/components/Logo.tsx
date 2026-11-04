import { Link } from '../router';
import { useI18n } from '../context/I18nContext';

/** Logo — image version. Replace public/logo.svg to change. */
export default function Logo() {
  const { t } = useI18n();
  return (
    <Link to="/" className="logo" aria-label={t('logo.label')}>
      <img src="/logo.svg" alt="LANGZI" width="160" height="40" style={{ display: 'block' }} />
    </Link>
  );
}
