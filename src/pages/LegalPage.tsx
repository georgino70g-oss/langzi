import { useI18n } from '../context/I18nContext';
import { legal } from '../data/legal';
import type { LegalKey } from '../data/legal';
import { useSeo } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';

export default function LegalPage({ docKey, path }: { docKey: LegalKey; path: string }) {
  const { lang } = useI18n();
  const doc = legal[lang][docKey];
  useSeo({ title: doc.title, description: doc.intro || doc.title, path, lang });

  return (
    <div className="container page narrow legal">
      <Breadcrumbs items={[{ label: doc.title }]} />
      <h1>{doc.title}</h1>
      {doc.intro && <p className="notice">{doc.intro}</p>}
      {doc.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
