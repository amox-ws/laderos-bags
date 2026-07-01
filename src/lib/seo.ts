// Central SEO configuration for Laderos Bags.
// Per-page titles/descriptions (bilingual el/en). Used by the <SEO /> component.

export const SITE_URL = 'https://www.laderosbags.gr';
export const SITE_NAME = 'Laderos Bags';
export const DEFAULT_OG_IMAGE =
  'https://storage.googleapis.com/gpt-engineer-file-uploads/EOvTIjSi3la1fOQUPjIBzIO5dKp2/social-images/social-1770739384600-Gemini_Generated_Image_9qc1zc9qc1zc9qc1.png';

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
      el: 'Χάρτινες & Πλαστικές Σακούλες στα Μέτρα σας | Laderos Bags',
      en: 'Custom Paper & Plastic Bags for Businesses | Laderos Bags',
    },
    description: {
      el: 'Η Laderos Bags κατασκευάζει χάρτινες και πλαστικές σακούλες υψηλής ποιότητας με εκτύπωση λογοτύπου για επιχειρήσεις. Εξατομικευμένες B2B λύσεις συσκευασίας σε όλη την Ελλάδα.',
      en: 'Laderos Bags manufactures high-quality custom paper and plastic bags with logo printing for businesses. Tailored B2B packaging solutions across Greece.',
    },
    path: '/',
  },
  '/about': {
    title: {
      el: 'Η Εταιρεία μας | Laderos Bags — Κατασκευή Σακουλών',
      en: 'About Us | Laderos Bags — Bag Manufacturing',
    },
    description: {
      el: 'Γνωρίστε τη Laderos Bags: εμπειρία στην παραγωγή χάρτινων και πλαστικών σακουλών με εκτύπωση για επιχειρήσεις. Ποιότητα, συνέπεια και εξατομικευμένη συσκευασία.',
      en: 'Meet Laderos Bags: experience in producing printed paper and plastic bags for businesses. Quality, reliability and tailored packaging.',
    },
    path: '/about',
  },
  '/products': {
    title: {
      el: 'Προϊόντα — Σακούλες Συσκευασίας για Επιχειρήσεις | Laderos Bags',
      en: 'Products — Business Packaging Bags | Laderos Bags',
    },
    description: {
      el: 'Δείτε τη γκάμα μας: χάρτινες και πλαστικές σακούλες με εκτύπωση λογοτύπου, σε διάφορα μεγέθη και σχέδια για κάθε επιχείρηση. Ζητήστε προσφορά.',
      en: 'Explore our range: custom-printed paper and plastic bags in various sizes and designs for every business. Request a quote.',
    },
    path: '/products',
  },
  '/products/paper-bags': {
    title: {
      el: 'Χάρτινες Σακούλες με Εκτύπωση Λογοτύπου | Laderos Bags',
      en: 'Custom Printed Paper Bags | Laderos Bags',
    },
    description: {
      el: 'Χάρτινες σακούλες υψηλής ποιότητας με εκτύπωση λογοτύπου, ανθεκτικές και οικολογικές, στα μέτρα της επιχείρησής σας. Χονδρική & εξατομικευμένες παραγγελίες.',
      en: 'High-quality custom paper bags with logo printing — durable and eco-friendly, made to your business specs. Wholesale & bespoke orders.',
    },
    path: '/products/paper-bags',
  },
  '/products/plastic-bags': {
    title: {
      el: 'Πλαστικές Σακούλες με Εκτύπωση Λογοτύπου | Laderos Bags',
      en: 'Custom Printed Plastic Bags | Laderos Bags',
    },
    description: {
      el: 'Πλαστικές σακούλες με εκτύπωση λογοτύπου σε πολλά μεγέθη και τύπους για κάθε επιχείρηση. Ανθεκτική, εξατομικευμένη συσκευασία. Χονδρική & custom παραγγελίες.',
      en: 'Custom-printed plastic bags in many sizes and types for every business. Durable, tailored packaging. Wholesale & custom orders.',
    },
    path: '/products/plastic-bags',
  },
  '/contact': {
    title: {
      el: 'Επικοινωνία & Προσφορά | Laderos Bags',
      en: 'Contact & Quote | Laderos Bags',
    },
    description: {
      el: 'Επικοινωνήστε με τη Laderos Bags για προσφορά σε χάρτινες και πλαστικές σακούλες. Ελασσώνος 13, Αχαρνές. Τηλ. +30 210 2443550.',
      en: 'Contact Laderos Bags for a quote on custom paper and plastic bags. Elassonos 13, Acharnes. Tel. +30 210 2443550.',
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
