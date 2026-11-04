import { useI18n } from '../context/I18nContext';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SizeGuide() {
  const { lang, t } = useI18n();
  useSeo({ title: t('sizeguide.title'), description: t('seo.sizeGuide.desc'), path: '/size-guide', lang });
  const rows = siteConfig.sizeGuide;
  const incomplete = rows.some((r) => r.chest === null || r.length === null || r.neck === null || r.neck === undefined);
  const cell = (n: number | string | null) => (n === null || n === undefined ? t('common.dash') : n);

  return (
    <div className="container page narrow">
      <Breadcrumbs items={[{ label: t('sizeguide.title') }]} />
      <h1>{t('sizeguide.title')}</h1>
      <p>{t('sizeguide.intro')}</p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t('sizeguide.size')}</th>
              <th scope="col">{t('sizeguide.chest')}</th>
              <th scope="col">{t('sizeguide.length')}</th>
              <th scope="col">{t('sizeguide.neck')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.size}>
                <th scope="row">{r.size}</th>
                <td>{cell(r.chest)}</td>
                <td>{cell(r.length)}</td>
                <td>{cell(r.neck)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {incomplete && <p className="notice">{t('sizeguide.pending')}</p>}
      <h2>{t('sizeguide.howTo')}</h2>
      <p>{t('sizeguide.tip')}</p>
    </div>
  );
}
