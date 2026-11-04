import { el } from './el';
import { en } from './en';
import type { TranslationKey } from './el';
import type { Lang } from './types';

export type { TranslationKey };

/** All UI translations. Edit el.ts (Greek) and en.ts (English). Legal pages: legal.ts. */
export const translations: Record<Lang, Record<TranslationKey, string>> = { el, en };

export function translate(lang: Lang, key: TranslationKey, params?: Record<string, string | number>): string {
  let text: string = translations[lang][key] ?? translations.el[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.split(`{${k}}`).join(String(v));
    }
  }
  return text;
}
