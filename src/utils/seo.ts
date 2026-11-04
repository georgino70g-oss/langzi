import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import type { Lang } from '../data/types';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  lang: Lang;
  noindex?: boolean;
  jsonLd?: object | null;
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string | null, hreflang?: string) {
  const sel = `link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Updates title, description, canonical, hreflang, Open Graph and optional JSON-LD per page. */
export function useSeo({ title, description, path, lang, noindex, jsonLd }: SeoOptions) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} | ${siteConfig.brandName}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', lang === 'el' ? 'el_GR' : 'en_GB');
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    const base = siteConfig.siteUrl.replace(/\/$/, '');
    if (base) {
      const clean = path === '/' ? '/' : path;
      setLink('canonical', `${base}${clean}${lang === 'en' ? '?lang=en' : ''}`);
      setLink('alternate', `${base}${clean}`, 'el');
      setLink('alternate', `${base}${clean}?lang=en`, 'en');
      setLink('alternate', `${base}${clean}`, 'x-default');
      setMeta('meta[property="og:url"]', 'property', 'og:url', `${base}${clean}`);
    } else {
      // Production URL unknown yet: do not publish wrong canonical/hreflang values.
      setLink('canonical', null);
      setLink('alternate', null, 'el');
      setLink('alternate', null, 'en');
      setLink('alternate', null, 'x-default');
    }

    const existing = document.getElementById('jsonld');
    existing?.remove();
    if (jsonLd) {
      const s = document.createElement('script');
      s.id = 'jsonld';
      s.type = 'application/ld+json';
      s.text = JSON.stringify(jsonLd);
      document.head.appendChild(s);
    }
    return () => {
      document.getElementById('jsonld')?.remove();
    };
  }, [title, description, path, lang, noindex, jsonLd]);
}
