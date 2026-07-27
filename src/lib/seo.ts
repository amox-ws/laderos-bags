// Central SEO configuration for Laderos Bags.
// Per-page titles/descriptions (bilingual el/en) + JSON-LD structured data.
// Used by the <SEO /> component.

export const SITE_URL = 'https://www.laderosbags.gr';
export const SITE_NAME = 'Laderos Bags';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Canonical Google Business Profile listing (derived from the Maps CID). */
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?cid=6099904786620582164';

/** Verified coordinates of Ελασσώνος 13, Αχαρνές (from the Maps listing). */
export const GEO = { latitude: 38.098358, longitude: 23.7499251 };

export type Lang = 'el' | 'en';

export interface PageSeo {
  title: { el: string; en: string };
  description: { el: string; en: string };
  /** Absolute path, e.g. "/products/paper-bags". Used for canonical URL. */
  path: string;
}

/** Keyed by route path. */
export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: {
      el: 'Χάρτινες & Πλαστικές Σακούλες με Εκτύπωση στα Μέτρα σας | Laderos Bags',
      en: 'Custom Printed Paper & Plastic Bags for Businesses | Laderos Bags',
    },
    description: {
      el: 'Κατασκευή χάρτινων και πλαστικών σακουλών με εκτύπωση λογοτύπου για επιχειρήσεις — καταστήματα, οπτικά, παιδικά και κάθε brand. 30+ χρόνια εμπειρίας, έδρα στις Αχαρνές, παραδόσεις σε όλη την Ελλάδα.',
      en: 'Manufacturing of custom paper and plastic bags with logo printing for businesses — retail, optical stores, kidswear and every brand. 30+ years of experience, based in Acharnes, deliveries across Greece.',
    },
    path: '/',
  },
  '/about': {
    title: {
      el: 'Η Εταιρεία μας — 30+ Χρόνια στην Κατασκευή Σακουλών | Laderos Bags',
      en: 'About Us — 30+ Years in Bag Manufacturing | Laderos Bags',
    },
    description: {
      el: 'Γνωρίστε τη Laderos Bags: πάνω από 30 χρόνια στην παραγωγή χάρτινων και πλαστικών σακουλών με εκτύπωση για επιχειρήσεις. Σύγχρονη παραγωγή στις Αχαρνές, ποιότητα και συνέπεια.',
      en: 'Meet Laderos Bags: over 30 years producing printed paper and plastic bags for businesses. Modern production in Acharnes, quality and reliability.',
    },
    path: '/about',
  },
  '/products': {
    title: {
      el: 'Προϊόντα — Σακούλες με Εκτύπωση για Κάθε Επιχείρηση | Laderos Bags',
      en: 'Products — Printed Bags for Every Business | Laderos Bags',
    },
    description: {
      el: 'Η γκάμα μας: χάρτινες σακούλες πολυτελείας, πλαστικές σακούλες, σακούλες για οπτικά και παιδικά καταστήματα — όλες με εκτύπωση λογοτύπου στα μέτρα σας. Ζητήστε προσφορά.',
      en: 'Our range: luxury paper bags, plastic bags, bags for optical and kids stores — all custom-printed to your specs. Request a quote.',
    },
    path: '/products',
  },
  '/products/paper-bags': {
    title: {
      el: 'Χάρτινες Σακούλες με Εκτύπωση — Οπτικά, Παιδικά & Retail | Laderos Bags',
      en: 'Custom Printed Paper Bags — Optical, Kids & Retail | Laderos Bags',
    },
    description: {
      el: 'Χάρτινες σακούλες πολυτελείας με εκτύπωση λογοτύπου: για καταστήματα λιανικής, οπτικά, παιδικά, κοσμηματοπωλεία και brands. Ανθεκτικές, ποιοτικές, στα μέτρα σας. Δείτε δείγματα δουλειάς μας.',
      en: 'Luxury custom paper bags with logo printing: for retail, optical stores, kidswear, jewellery and brands. Durable, premium, made to measure. See samples of our work.',
    },
    path: '/products/paper-bags',
  },
  '/products/plastic-bags': {
    title: {
      el: 'Πλαστικές Σακούλες με Εκτύπωση Λογοτύπου | Laderos Bags',
      en: 'Custom Printed Plastic Bags | Laderos Bags',
    },
    description: {
      el: 'Πλαστικές σακούλες με εκτύπωση λογοτύπου σε πολλά μεγέθη, πάχη και τύπους λαβής για κάθε επιχείρηση. Ανθεκτική, εξατομικευμένη συσκευασία. Χονδρική & custom παραγγελίες.',
      en: 'Custom-printed plastic bags in many sizes, thicknesses and handle types for every business. Durable, tailored packaging. Wholesale & custom orders.',
    },
    path: '/products/plastic-bags',
  },
  '/products/optika': {
    title: {
      el: 'Σακούλες για Οπτικά Καταστήματα με Εκτύπωση | Laderos Bags',
      en: 'Custom Printed Bags for Optical Stores | Laderos Bags',
    },
    description: {
      el: 'Χάρτινες σακούλες για οπτικά και καταστήματα φακών επαφής, με εκτύπωση λογοτύπου έως 4 χρώματα. Διαστάσεις για θήκες γυαλιών, λαβές και φινιρίσματα της επιλογής σας.',
      en: 'Paper bags for optical and contact-lens stores, printed with your logo in up to 4 colours. Sized for eyewear cases, with your choice of handles and finishes.',
    },
    path: '/products/optika',
  },
  '/products/paidika': {
    title: {
      el: 'Σακούλες για Παιδικά Καταστήματα με Εκτύπωση | Laderos Bags',
      en: 'Custom Printed Bags for Kids Stores | Laderos Bags',
    },
    description: {
      el: 'Χάρτινες σακούλες για παιδικά ρούχα, είδη μπεμπέ και παιδικά υποδήματα, με πολύχρωμη εκτύπωση λογοτύπου. Πολλά μεγέθη, ανθεκτικές λαβές, δυνατότητα πλαστικοποίησης.',
      en: 'Paper bags for childrenswear, baby goods and kids footwear, with full-colour logo printing. Multiple sizes, durable handles, lamination available.',
    },
    path: '/products/paidika',
  },
  '/contact': {
    title: {
      el: 'Επικοινωνία & Προσφορά — Αχαρνές | Laderos Bags',
      en: 'Contact & Quote — Acharnes | Laderos Bags',
    },
    description: {
      el: 'Ζητήστε προσφορά για χάρτινες και πλαστικές σακούλες με εκτύπωση. Ελασσώνος 13, Αχαρνές 136 72. Τηλ: 210 244 3550, 210 244 3800, 697 266 1870.',
      en: 'Request a quote for custom printed paper and plastic bags. Elassonos 13, Acharnes 136 72, Greece. Tel: +30 210 244 3550, +30 210 244 3800.',
    },
    path: '/contact',
  },
  '/privacy-policy': {
    title: {
      el: 'Πολιτική Απορρήτου | Laderos Bags',
      en: 'Privacy Policy | Laderos Bags',
    },
    description: {
      el: 'Πολιτική απορρήτου της Laderos Bags: πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα.',
      en: 'Laderos Bags privacy policy: how we collect, use and protect your personal data.',
    },
    path: '/privacy-policy',
  },
};

/** Fallback for unknown routes (e.g. 404). */
export const NOT_FOUND_SEO: PageSeo = {
  title: {
    el: 'Η σελίδα δεν βρέθηκε | Laderos Bags',
    en: 'Page Not Found | Laderos Bags',
  },
  description: {
    el: 'Η σελίδα που ζητήσατε δεν βρέθηκε. Επιστρέψτε στην αρχική της Laderos Bags.',
    en: 'The page you requested was not found. Return to the Laderos Bags home page.',
  },
  path: '/404',
};

/* ═══════════════════════════════════════════════════════════════════
   JSON-LD structured data
   ═══════════════════════════════════════════════════════════════════ */

/**
 * LocalBusiness — the strongest signal for local queries
 * («σακούλες με εκτύπωση Αχαρνές/Αθήνα» etc.).
 */
export const LOCAL_BUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  description:
    'Κατασκευή χάρτινων και πλαστικών σακουλών με εκτύπωση λογοτύπου για επιχειρήσεις.',
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.jpg`,
  image: `${SITE_URL}/og-image.jpg`,
  email: 'laderosbags@gmail.com',
  telephone: '+302102443550',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+302102443550',
      contactType: 'sales',
      areaServed: 'GR',
      availableLanguage: ['el', 'en'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+302102443800',
      contactType: 'customer service',
      areaServed: 'GR',
      availableLanguage: ['el', 'en'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+306972661870',
      contactType: 'sales',
      areaServed: 'GR',
      availableLanguage: ['el', 'en'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ελασσώνος 13',
    addressLocality: 'Αχαρνές',
    postalCode: '136 72',
    addressRegion: 'Αττική',
    addressCountry: 'GR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  hasMap: GOOGLE_MAPS_URL,
  sameAs: [GOOGLE_MAPS_URL],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  priceRange: '€€',
};

/** WebSite — names the site in search results. */
export const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'el-GR',
  publisher: { '@id': `${SITE_URL}/#business` },
};

/** BreadcrumbList builder: makeBreadcrumbLd([['Αρχική','/'],['Προϊόντα','/products']]) */
export const makeBreadcrumbLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${SITE_URL}${path === '/' ? '' : path}`,
  })),
});

/** FAQPage builder — makes the questions eligible for rich results. */
export const makeFaqLd = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});

/** ItemList builder for product/category listings. */
export const makeItemListLd = (name: string, items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  itemListElement: items.map(([itemName, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: itemName,
    url: `${SITE_URL}${path}`,
  })),
});
