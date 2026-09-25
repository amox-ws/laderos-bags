/**
 * Static prerender for the Laderos Bags SPA.
 *
 * Vite ships a single empty index.html, so crawlers receive zero content
 * until they execute JavaScript — and AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot) never do. This script runs after `vite build` and writes one
 * real HTML file per route into dist/.
 *
 * Full mode (default): each route is rendered with the real React app
 * (dist-ssr/entry-server.js, built by `vite build --ssr`), so the HTML holds
 * the complete page — all text, images with alt text, FAQ — plus the page's
 * own <title>/meta/canonical/JSON-LD from react-helmet. The browser app then
 * mounts over it and renders the same thing, so visitors see no difference.
 *
 * Fallback mode: if the server build is missing or a route fails to render,
 * that route gets the lightweight seeded markup below (title, meta, h1, intro,
 * internal links) exactly as before.
 *
 * Either way the site-wide LocalBusiness/WebSite JSON-LD is regenerated from
 * src/lib/seo.ts, so business details and social profiles live in one place.
 *
 * Failures are non-fatal: the build still succeeds with the plain SPA output.
 */
import { build } from 'esbuild';
import { existsSync } from 'node:fs';
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
  '/products/optika': 'Σακούλες για Οπτικά',
  '/products/paidika': 'Σακούλες για Παιδικά',
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
  '/products/optika':
    'Χάρτινες σακούλες για οπτικά και καταστήματα φακών επαφής, με εκτύπωση λογοτύπου έως 4 χρώματα και διαστάσεις για θήκες γυαλιών.',
  '/products/paidika':
    'Χάρτινες σακούλες για παιδικά ρούχα, είδη μπεμπέ και παιδικά υποδήματα, με πολύχρωμη εκτύπωση και ανθεκτικές λαβές.',
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

/** Page module behind each route, to preload its JS chunk (see modulePreloads). */
const PAGE_SRC = {
  '/': 'src/pages/HomePage.tsx',
  '/about': 'src/pages/AboutPage.tsx',
  '/products': 'src/pages/ProductsPage.tsx',
  '/products/paper-bags': 'src/pages/PaperBagsPage.tsx',
  '/products/plastic-bags': 'src/pages/PlasticBagsPage.tsx',
  '/products/optika': 'src/pages/CategoryPage.tsx',
  '/products/paidika': 'src/pages/CategoryPage.tsx',
  '/contact': 'src/pages/ContactPage.tsx',
  '/privacy-policy': 'src/pages/PrivacyPolicyPage.tsx',
  '/404': 'src/pages/NotFound.tsx',
};

/** <link rel="modulepreload"> for a route's chunk and its imports, so the page
 *  code downloads in parallel with the main bundle instead of after it. */
function modulePreloads(manifest, path) {
  const start = manifest?.[PAGE_SRC[path]];
  if (!start) return '';
  const files = new Set();
  const walk = (entry) => {
    if (!entry || entry.isEntry || files.has(entry.file)) return;
    files.add(entry.file);
    (entry.imports || []).forEach((k) => walk(manifest[k]));
  };
  walk(start);
  return [...files].map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`).join('\n    ');
}

/** Head tags react-helmet renders for every page — drop the static copies. */
const HELMET_OWNED = [
  /<title>[\s\S]*?<\/title>\s*/,
  /<meta\s+name="description"[^>]*>\s*/g,
  /<link\s+rel="canonical"[^>]*>\s*/g,
  /<meta\s+name="robots"[^>]*>\s*/g,
  /<meta\s+property="og:(title|description|url|site_name|locale)"[^>]*>\s*/g,
  /<meta\s+name="twitter:(title|description)"[^>]*>\s*/g,
];

/** Full page: the real React render + helmet head tags. */
function renderFull(base, { appHtml, helmet, preloads }) {
  let html = base;
  for (const re of HELMET_OWNED) html = html.replace(re, '');
  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
    preloads,
  ]
    .filter(Boolean)
    .join('\n    ');
  html = html.replace('</head>', `    ${head}\n  </head>`);
  const lang = /lang="([a-z-]+)"/i.exec(helmet.htmlAttributes.toString())?.[1];
  if (lang) html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  return html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${appHtml}</div>`);
}

/** Replace index.html's static site-wide JSON-LD with the one from seo.ts. */
function withSiteGraph(base, graph) {
  if (!graph) return base;
  const tag = `<script type="application/ld+json">${JSON.stringify(graph)}</script>`;
  const re = /<script type="application\/ld\+json">[\s\S]*?"@graph"[\s\S]*?<\/script>/;
  return re.test(base) ? base.replace(re, tag) : base.replace('</head>', `  ${tag}\n</head>`);
}

/** Load the server build (dist-ssr) if present; null → fallback mode. */
async function loadServerRender() {
  const entry = join(root, 'dist-ssr', 'entry-server.js');
  if (!existsSync(entry)) return null;
  try {
    const mod = await import(pathToFileURL(entry).href);
    await mod.preloadAll();
    return mod.render;
  } catch (err) {
    console.warn('⚠ server render unavailable, using seeded markup:', err?.message || err);
    return null;
  }
}

async function loadManifest() {
  try {
    return JSON.parse(await readFile(join(dist, '.vite', 'manifest.json'), 'utf8'));
  } catch {
    return null;
  }
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
  const { PAGE_SEO, NOT_FOUND_SEO, SITE_URL, SITE_GRAPH_LD, makeBreadcrumbLd } = await loadSeo();
  const base = withSiteGraph(await readFile(join(dist, 'index.html'), 'utf8'), SITE_GRAPH_LD);
  const serverRender = await loadServerRender();
  const manifest = await loadManifest();

  const crumbsFor = (path) => {
    if (path === '/') return null;
    const items = [['Αρχική', '/']];
    if (path.startsWith('/products/')) items.push(['Προϊόντα', '/products']);
    items.push([NAV_LABEL[path] || path, path]);
    return makeBreadcrumbLd(items);
  };

  /** Full render when possible, seeded markup otherwise. */
  const pageHtml = (path, url, seeded) => {
    if (serverRender) {
      try {
        const { html: appHtml, helmet } = serverRender(url);
        if (appHtml && helmet) {
          return { html: renderFull(base, { appHtml, helmet, preloads: modulePreloads(manifest, path) }), mode: 'full' };
        }
      } catch (err) {
        console.warn(`  ⚠ ${path}: server render failed (${err?.message || err}), using seeded markup`);
      }
    }
    return { html: renderPage(base, seeded), mode: 'seeded' };
  };

  let count = 0;
  for (const [path, cfg] of Object.entries(PAGE_SEO)) {
    const title = cfg.title.el;
    const description = cfg.description.el;
    const canonical = `${SITE_URL}${path === '/' ? '' : path}`;
    const h1 = title.split(' | ')[0];

    const { html, mode } = pageHtml(path, path, {
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
    console.log(`  prerendered ${path} (${mode})`);
  }

  // Real 404 page (Vercel serves dist/404.html with a 404 status).
  const nf = NOT_FOUND_SEO;
  const { html: notFound, mode: nfMode } = pageHtml('/404', '/__not-found__', {
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
  console.log(`  prerendered 404.html (${nfMode})`);

  // The route→chunk manifest was only needed here; don't publish it.
  await rm(join(dist, '.vite'), { recursive: true, force: true });

  console.log(`✓ prerender: ${count} routes + 404 (${serverRender ? 'full render' : 'seeded fallback'})`);
}

main().catch((err) => {
  // Never break the build — fall back to the plain SPA output.
  console.warn('⚠ prerender skipped:', err?.message || err);
});
