/**
 * Resolves file names from the root /images folder to hashed URLs that Vite
 * includes in the production build. Missing files simply return undefined
 * (the UI then shows a clean placeholder instead of a broken image).
 */
const modules = import.meta.glob('/images/*.{webp,avif,jpg,jpeg,png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const byName = new Map<string, string>(Object.entries(modules).map(([path, url]) => [path.split('/').pop() as string, url]));

export function resolveImage(fileName?: string): string | undefined {
  return fileName ? byName.get(fileName) : undefined;
}
