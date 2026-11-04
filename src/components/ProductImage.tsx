import { useEffect, useState } from 'react';
import { resolveImage } from '../utils/images';
import { useI18n } from '../context/I18nContext';

interface Props {
  fileName?: string;
  alt: string;
  accent?: string;
  eager?: boolean;
  className?: string;
}

/** Shows the product photo; falls back to a clean plaid placeholder if the file is missing or fails to load. */
export default function ProductImage({ fileName, alt, accent = '#555', eager = false, className = '' }: Props) {
  const { t } = useI18n();
  const url = resolveImage(fileName);
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [fileName]);

  if (!url || failed) {
    return (
      <div
        className={`img-placeholder ${className}`}
        style={{ ['--accent' as string]: accent }}
        role="img"
        aria-label={`${alt} — ${t('product.imageMissing')}`}
      >
        <span>{t('product.imageMissing')}</span>
      </div>
    );
  }
  return (
    <img
      className={className}
      src={url}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      width={800}
      height={1000}
      onError={() => setFailed(true)}
    />
  );
}
