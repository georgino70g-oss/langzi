import { useI18n } from '../context/I18nContext';
import { Link } from '../router';

export interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t } = useI18n();
  const all: Crumb[] = [{ label: t('breadcrumb.home'), to: '/' }, ...items];
  return (
    <nav className="crumbs" aria-label={t('breadcrumb.label')}>
      <ol>
        {all.map((c, i) => (
          <li key={i}>
            {c.to && i < all.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
