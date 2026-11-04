import { useI18n } from '../context/I18nContext';
import { useSeo } from '../utils/seo';
import { Link, useRouter } from '../router';

interface Props {
  title?: string;
  text?: string;
  backTo?: string;
  backLabel?: string;
}

export default function NotFound({ title, text, backTo = '/', backLabel }: Props) {
  const { lang, t } = useI18n();
  const { path } = useRouter();
  useSeo({ title: title ?? t('notfound.title'), description: text ?? t('notfound.text'), path, lang, noindex: true });
  return (
    <div className="container page center">
      <h1>{title ?? t('notfound.title')}</h1>
      <p>{text ?? t('notfound.text')}</p>
      <Link to={backTo} className="btn btn--primary">
        {backLabel ?? t('notfound.home')}
      </Link>
    </div>
  );
}
