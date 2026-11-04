/**
 * Runs automatically before `npm run build` (see "prebuild" in package.json).
 * Generates public/sitemap.xml and public/robots.txt from siteConfig.siteUrl and the active products.
 * If siteUrl is empty, no sitemap is written (a sitemap needs absolute URLs) and robots.txt omits the Sitemap line.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { siteConfig } from '../src/data/siteConfig';
import { products } from '../src/data/products';

const base = siteConfig.siteUrl.replace(/\/$/, '');
const publicDir = resolve(process.cwd(), 'public');

const staticRoutes = ['/', '/products', '/size-guide', '/shipping', '/returns', '/privacy', '/terms', '/contact'];
const productRoutes = products.filter((p) => p.active).map((p) => `/products/${p.id}`);

let robots = 'User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /checkout\nDisallow: /order-confirmation\nDisallow: /__forms.html\n';

if (base) {
  const urls = [...staticRoutes, ...productRoutes];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${base}${u}</loc>\n` +
          `    <xhtml:link rel="alternate" hreflang="el" href="${base}${u}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="en" href="${base}${u}?lang=en"/>\n  </url>`,
      )
      .join('\n') +
    `\n</urlset>\n`;
  writeFileSync(resolve(publicDir, 'sitemap.xml'), xml);
  robots += `\nSitemap: ${base}/sitemap.xml\n`;
  console.log(`sitemap.xml written with ${urls.length} URLs`);
} else {
  console.log('siteConfig.siteUrl is empty: sitemap.xml not generated (set it after the first deploy).');
}

writeFileSync(resolve(publicDir, 'robots.txt'), robots);
console.log('robots.txt written');
