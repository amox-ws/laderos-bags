/**
 * Static prerender for the Laderos Bags SPA.
 *
 * Vite ships a single empty index.html, so crawlers receive zero content
 * until they execute JavaScript. This script runs after `vite build` and
 * writes one real HTML file per route into dist/, each containing:
 *   - the correct <title>, meta description, canonical and OG/Twitter tags
 *   - BreadcrumbList JSON-LD
 *   - a visible <h1>, intro paragraph and internal links inside #root
 *
 * React replaces the seeded markup on mount, so users see no difference —
 * but Google gets a fully readable page without running any JS, and the
 * internal links help it discover the other routes.
 *
 * Failures are non-fatal: the build still succeeds with the plain SPA output.
 */
import { build } from 'esbuild';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Compile src/lib/seo.ts to a temporary ESM file so we can import its data. */
async function loadSeo() {
  const tmp = join(dist, '.seo.tmp.mjs');
  await build({
    entryPoints: [join(root, 'src/lib/seo.ts')],
    outfile: tmp,
    format: 'esm',
    platform: 'node',
    bundle: true,
    logLevel: 'silent',
  });
  const mod = await import(pathToFileURL(tmp).href);
  await rm(tmp, { force: true });
  return mod;
}

/** Human label for each route, used in the seeded nav. */
const NAV_LABEL = {
  '/': 'Αρχική',
  '/about': 'Η Εταιρεία',
  '/products': 'Προϊόντα',
  '/products/paper-bags': 'Χάρτινες Σακούλες',
  '/products/plastic-bags': 'Πλαστικές Σακούλες',
  '/contact': 'Επικοινωνία',
  '/privacy-policy': 'Πολιτική Απορρήτου',
};

/** Extra keyword-rich context per route (mirrors what the page actually says). */
const EXTRA = {
  '/products/paper-bags':
    'Κατασκευάζουμε χάρτινες σακούλες με εκτύπωση λογοτύπου για καταστήματα λιανικής, οπτικά και παιδικά καταστήματα, σε μεγέθη και φινιρίσματα της επιλογής σας.',
  '/products/plastic-bags':
    'Πλαστικές σακούλες με εκτύπωση λογοτύπου σε πολλά μεγέθη, πάχη και τύπους λαβής, για κάθε επιχείρηση.',
  '/products':
    'Χάρτινες σακούλες πολυτελείας, πλαστικές σακούλες, καθώς και σακούλες ειδικά για οπτικά και παιδικά καταστήματα.',
  '/': 'Πάνω από 30 χρόνια εμπειρίας στην παραγωγή σακουλών συσκευασίας. Έδρα στις Αχαρνές Αττικής, με παραδόσεις σε όλη την Ελλάδα.',
  '/about':
    'Σύγχρονη μονάδα παραγωγής στις Αχαρνές, με έμφαση στην ποιότητα, τη συνέπεια και την εξατομικευμένη εξυπηρέτηση.',
  '/contact':
    'Ελασσώνος 13, Αχαρνές 136 72. Τηλέφωνα: 210 244 3550, 210 244 3800, 697 266 1870. Email: laderosbags@gmail.com',
};

/**
 * Markup seeded inside #root. React wipes it the moment it mounts, but since
 * the module script is deferred the visitor may glimpse it for a moment — so
 * it is styled inline as a clean, on-brand intro (same navy/blue as the site)
 * rather than raw unstyled text. The copy matches the page's real content.
 */
function seededBody(path, h1, description) {
  const S = {
    wrap: 'min-height:100vh;background:hsl(220 55% 6%);color:#fff;display:flex;align-items:center;justify-content:center;padding:2rem;font-family:Manrope,system-ui,sans-serif;',
    inner: 'max-width:56rem;text-align:center;',
    h1: 'font-size:clamp(1.9rem,5vw,3.6rem);font-weight:800;text-transform:uppercase;line-height:1;letter-spacing:-0.02em;margin:0 0 1.25rem;color:#fff;',
    p: 'font-size:1.05rem;line-height:1.7;opacity:0.8;margin:0 auto 1rem;max-width:44rem;',
    nav: 'margin:2rem 0 0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:0.5rem 1.5rem;justify-content:center;',
    a: 'color:hsl(210 88% 60%);text-decoration:none;font-weight:800;text-transform:uppercase;font-size:0.8rem;letter-spacing:0.06em;',
    foot: 'margin-top:2rem;font-size:0.85rem;opacity:0.6;',
  };

  const links = Object.entries(NAV_LABEL)
    .filter(([p]) => p !== path)
    .map(([p, label]) => `<li><a style="${S.a}" href="${p}">${esc(label)}</a></li>`)
    .join('');

  const extra = EXTRA[path] ? `<p style="${S.p}">${esc(EXTRA[path])}</p>` : '';

  return `<div id="root"><div style="${S.wrap}"><div style="${S.inner}">
      <h1 style="${S.h1}">${esc(h1)}</h1>
      <p style="${S.p}">${esc(description)}</p>
      ${extra}
      <nav aria-label="Laderos Bags"><ul style="${S.nav}">${links}</ul></nav>
      <p style="${S.foot}"><strong>Laderos Bags</strong> — Ελασσώνος 13, Αχαρνές 136 72 ·
      <a style="color:inherit" href="tel:+302102443550">210 244 3550</a> ·
      <a style="color:inherit" href="mailto:laderosbags@gmail.com">laderosbags@gmail.com</a></p>
    </div></div></div>`;
}

/** Replace (or insert) a meta/link tag in the head. */
function setTag(html, matcher, replacement) {
  return matcher.test(html)
    ? html.replace(matcher, replacement)
    : html.replace('</head>', `    ${replacement}\n  </head>`);
}

function renderPage(base, { path, title, description, canonical, jsonLd, h1, siteUrl, noindex }) {
  let html = base;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);

  html = setTag(
    html,
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${esc(description)}" />`
  );
  html = setTag(html, /<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`);
  html = setTag(html, /<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`);
  html = setTag(
    html,
    /<meta\s+property="og:description"[^>]*>/,
    `<meta property="og:description" content="${esc(description)}" />`
  );
  html = setTag(html, /<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`);
  html = setTag(html, /<meta\s+name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(title)}" />`);
  html = setTag(
    html,
    /<meta\s+name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${esc(description)}" />`
  );

  if (noindex) {
    html = setTag(html, /<meta\s+name="robots"[^>]*>/, `<meta name="robots" content="noindex, follow" />`);
  }

  if (jsonLd) {
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`
    );
  }

  // Seed crawlable content inside the React mount point.
  html = html.replace(/<div id="root">\s*<\/div>/, seededBody(path, h1, description, siteUrl));

  return html;
}

async function main() {
  const { PAGE_SEO, NOT_FOUND_SEO, SITE_URL, makeBreadcrumbLd } = await loadSeo();
  const base = await readFile(join(dist, 'index.html'), 'utf8');

  const crumbsFor = (path) => {
    if (path === '/') return null;
    const items = [['Αρχική', '/']];
    if (path.startsWith('/products/')) items.push(['Προϊόντα', '/products']);
    items.push([NAV_LABEL[path] || path, path]);
    return makeBreadcrumbLd(items);
  };

  let count = 0;
  for (const [path, cfg] of Object.entries(PAGE_SEO)) {
    const title = cfg.title.el;
    const description = cfg.description.el;
    const canonical = `${SITE_URL}${path === '/' ? '' : path}`;
    const h1 = title.split(' | ')[0];

    const html = renderPage(base, {
      path,
      title,
      description,
      canonical,
      jsonLd: crumbsFor(path),
      h1,
      siteUrl: SITE_URL,
    });

    const outDir = path === '/' ? dist : join(dist, path);
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, 'index.html'), html, 'utf8');
    count++;
    console.log(`  prerendered ${path}`);
  }

  // Real 404 page (Vercel serves dist/404.html with a 404 status).
  const nf = NOT_FOUND_SEO;
  const notFound = renderPage(base, {
    path: '/404',
    title: nf.title.el,
    description: nf.description.el,
    canonical: `${SITE_URL}/404`,
    jsonLd: null,
    h1: nf.title.el.split(' | ')[0],
    siteUrl: SITE_URL,
    noindex: true,
  });
  await writeFile(join(dist, '404.html'), notFound, 'utf8');
  console.log('  prerendered 404.html');

  console.log(`✓ prerender: ${count} routes + 404`);
}

main().catch((err) => {
  // Never break the build — fall back to the plain SPA output.
  console.warn('⚠ prerender skipped:', err?.message || err);
});
