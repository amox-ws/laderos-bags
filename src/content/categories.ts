/**
 * Content for the dedicated product-category landing pages
 * (/products/optika, /products/paidika).
 *
 * Every factual claim here comes from data already present in the project:
 * the sizes / handles / finishings / print colours offered by the quote form,
 * the company's stated 30+ years of experience and Acharnes production site,
 * and the brands visible in the product photography. Nothing about pricing,
 * minimum order quantities or lead times is stated, since we have no source
 * for those.
 */

export interface CategoryFaq {
  q: { el: string; en: string };
  a: { el: string; en: string };
}

export interface CategorySection {
  heading: { el: string; en: string };
  body: { el: string[]; en: string[] };
}

export interface CategoryContent {
  slug: string;
  eyebrow: { el: string; en: string };
  h1: { el: string; en: string };
  intro: { el: string[]; en: string[] };
  sections: CategorySection[];
  highlights: { el: string[]; en: string[] };
  galleryHeading: { el: string; en: string };
  galleryNote: { el: string; en: string };
  faq: CategoryFaq[];
  images: string[];
  /** Alt-text prefix for gallery images. */
  altPrefix: { el: string; en: string };
}

const SPEC_SIZES = '53x43x14, 28x38x9, 40x34x12, 24x24x10, 38x31x9, 25x40x12, 40x40x15, 60x50x15, 25x25x12, 28x24x9';

/* ─────────────────────────── ΟΠΤΙΚΑ ─────────────────────────── */

export const OPTIKA: CategoryContent = {
  slug: 'optika',
  eyebrow: { el: 'Κατηγορία', en: 'Category' },
  h1: {
    el: 'Σακούλες για Οπτικά Καταστήματα',
    en: 'Bags for Optical Stores',
  },
  intro: {
    el: [
      'Στα οπτικά καταστήματα η συσκευασία δεν είναι απλώς μια σακούλα — είναι η τελευταία εικόνα που παίρνει μαζί του ο πελάτης. Ένα ζευγάρι γυαλιά είναι προϊόν αξίας και η σακούλα που το συνοδεύει πρέπει να το δείχνει.',
      'Στη Laderos Bags κατασκευάζουμε χάρτινες σακούλες ειδικά για οπτικά και καταστήματα φακών επαφής, με εκτύπωση του λογοτύπου σας και διαστάσεις που ταιριάζουν στις θήκες γυαλιών. Με πάνω από 30 χρόνια εμπειρίας και δική μας παραγωγή στις Αχαρνές, αναλαμβάνουμε ολόκληρη τη διαδικασία, από τον σχεδιασμό μέχρι την παράδοση.',
    ],
    en: [
      'In an optical store the packaging is not just a bag — it is the last impression the customer takes with them. A pair of glasses is a considered purchase, and the bag that carries it should reflect that.',
      'At Laderos Bags we manufacture paper bags specifically for optical and contact-lens stores, printed with your logo and sized to fit eyewear cases. With over 30 years of experience and our own production facility in Acharnes, we handle the entire process from design to delivery.',
    ],
  },
  sections: [
    {
      heading: {
        el: 'Τι κάνει διαφορετική μια σακούλα για οπτικά',
        en: 'What makes an optical-store bag different',
      },
      body: {
        el: [
          'Οι θήκες γυαλιών είναι άκαμπτες και βαριές σε σχέση με τον όγκο τους. Αυτό σημαίνει ότι η σακούλα χρειάζεται σωστή αναλογία διαστάσεων και ανθεκτική βάση, ώστε να μην παραμορφώνεται κατά τη μεταφορά.',
          'Παράλληλα, το οπτικό είναι χώρος με έντονη αισθητική ταυτότητα. Γι\' αυτό δίνουμε ιδιαίτερη προσοχή στην πιστότητα του χρώματος κατά την εκτύπωση και στην ποιότητα του φινιρίσματος — ματ ή γυαλιστερό, με ή χωρίς πλαστικοποίηση.',
        ],
        en: [
          'Eyewear cases are rigid and heavy relative to their volume, which means the bag needs the right proportions and a reinforced base so it holds its shape in transit.',
          'At the same time, an optical store is a design-led space. That is why we pay particular attention to colour accuracy during printing and to the quality of the finish — matte or glossy, with or without lamination.',
        ],
      },
    },
    {
      heading: {
        el: 'Επιλογές που έχετε στη διάθεσή σας',
        en: 'Options available to you',
      },
      body: {
        el: [
          `Διαθέτουμε μια σειρά έτοιμων μεγεθών (${SPEC_SIZES} εκ.), ενώ μπορούμε να κατασκευάσουμε και σακούλα σε εντελώς δικές σας διαστάσεις, αν κανένα από τα τυποποιημένα δεν εξυπηρετεί.`,
          'Για τις λαβές μπορείτε να επιλέξετε ανάμεσα σε κορδέλα, κορδόνι, στριφτή χάρτινη λαβή ή λάστιχο. Η εκτύπωση γίνεται από 1 έως 4 χρώματα, ενώ για πιο απαιτητικές δουλειές προσφέρουμε θερμοτυπία, ανάγλυφο λογότυπο και εσωτερική εκτύπωση.',
        ],
        en: [
          `We offer a range of ready sizes (${SPEC_SIZES} cm) and can also produce a bag in fully custom dimensions if none of the standard options work for you.`,
          'For handles you can choose between ribbon, cord, twisted paper handle or elastic. Printing runs from 1 to 4 colours, and for more demanding work we offer hot stamping, embossed logos and inside printing.',
        ],
      },
    },
  ],
  highlights: {
    el: [
      'Εκτύπωση λογοτύπου από 1 έως 4 χρώματα',
      'Διαστάσεις προσαρμοσμένες σε θήκες γυαλιών',
      'Λαβές: κορδέλα, κορδόνι, στριφτή, λάστιχο',
      'Φινίρισμα ματ, γυαλιστερό ή πλαστικοποιημένο',
      'Δυνατότητα θερμοτυπίας & ανάγλυφου λογοτύπου',
      'Δική μας παραγωγή — έλεγχος σε κάθε στάδιο',
    ],
    en: [
      'Logo printing from 1 to 4 colours',
      'Dimensions adapted to eyewear cases',
      'Handles: ribbon, cord, twisted, elastic',
      'Matte, glossy or laminated finish',
      'Hot stamping & embossed logo available',
      'In-house production — control at every stage',
    ],
  },
  galleryHeading: { el: 'Δείγματα από οπτικά καταστήματα', en: 'Samples from optical stores' },
  galleryNote: {
    el: 'Σακούλες που έχουμε κατασκευάσει για οπτικά καταστήματα και καταστήματα φακών επαφής.',
    en: 'Bags we have produced for optical and contact-lens stores.',
  },
  faq: [
    {
      q: { el: 'Μπορώ να τυπώσω το λογότυπο του καταστήματός μου;', en: 'Can I print my store logo?' },
      a: {
        el: 'Ναι. Κάθε σακούλα κατασκευάζεται με εκτύπωση του δικού σας λογοτύπου, από 1 έως 4 χρώματα. Μπορούμε επίσης να προσθέσουμε διεύθυνση, τηλέφωνο και social media, όπως βλέπετε στα δείγματα.',
        en: 'Yes. Every bag is produced with your own logo printed on it, from 1 to 4 colours. We can also add your address, phone number and social media, as shown in the samples.',
      },
    },
    {
      q: { el: 'Τι μεγέθη είναι διαθέσιμα;', en: 'What sizes are available?' },
      a: {
        el: `Διαθέτουμε τυποποιημένα μεγέθη (${SPEC_SIZES} εκ.) και παράλληλα κατασκευάζουμε σακούλες σε εντελώς δικές σας διαστάσεις, όταν χρειάζεται κάτι ειδικό.`,
        en: `We stock standard sizes (${SPEC_SIZES} cm) and also manufacture bags in fully custom dimensions when something specific is required.`,
      },
    },
    {
      q: { el: 'Τι τύπους λαβής μπορώ να επιλέξω;', en: 'What handle types can I choose?' },
      a: {
        el: 'Για τις χάρτινες σακούλες προσφέρουμε κορδέλα, κορδόνι, στριφτή χάρτινη λαβή και λάστιχο. Η επιλογή επηρεάζει τόσο την αισθητική όσο και την αντοχή.',
        en: 'For paper bags we offer ribbon, cord, twisted paper handle and elastic. The choice affects both the look and the durability.',
      },
    },
    {
      q: { el: 'Πώς ζητάω προσφορά;', en: 'How do I request a quote?' },
      a: {
        el: 'Συμπληρώνετε τη φόρμα προσφοράς επιλέγοντας τύπο σακούλας, μέγεθος, λαβή, φινίρισμα και εκτύπωση, ή τηλεφωνείτε απευθείας στο 210 244 3550.',
        en: 'Fill in the quote form selecting bag type, size, handle, finish and printing, or call us directly on +30 210 244 3550.',
      },
    },
  ],
  altPrefix: { el: 'Χάρτινη σακούλα για οπτικά', en: 'Paper bag for optical store' },
  images: [
    '/paper_product/optika/sakoula-optolux.webp',
    '/paper_product/optika/sakoula-optolux-2.webp',
    '/paper_product/optika/sakoula-optolux-3.webp',
    '/paper_product/optika/sakoula-optolux-panagouli.webp',
    '/paper_product/optika/sakoula-optolux-panagouli-2.webp',
    '/paper_product/optika/sakoula-optofree.webp',
    '/paper_product/optika/sakoula-optofree-2.webp',
    '/paper_product/optika/sakoula-optofree-3.webp',
    '/paper_product/optika/sakoula-occhi-eleganti.webp',
    '/paper_product/optika/sakoula-optical-room.webp',
    '/paper_product/optika/sakoula-optics.webp',
    '/paper_product/optika/sakoula-optics-poly.webp',
    '/paper_product/optika/sakoula-excellens.webp',
    '/paper_product/optika/sakoula-eye-like-u.webp',
  ],
};

/* ─────────────────────────── ΠΑΙΔΙΚΑ ─────────────────────────── */

export const PAIDIKA: CategoryContent = {
  slug: 'paidika',
  eyebrow: { el: 'Κατηγορία', en: 'Category' },
  h1: {
    el: 'Σακούλες για Παιδικά Καταστήματα',
    en: 'Bags for Kids Stores',
  },
  intro: {
    el: [
      'Τα παιδικά καταστήματα έχουν κάτι που δεν έχουν οι υπόλοιποι κλάδοι: χρώμα, παιχνιδιάρικη διάθεση και μια ταυτότητα που πρέπει να περνάει αμέσως. Η σακούλα είναι από τα πρώτα σημεία όπου φαίνεται αυτό.',
      'Κατασκευάζουμε χάρτινες σακούλες για παιδικά ρούχα, είδη μπεμπέ, παιδικά υποδήματα και καταστήματα εφηβικής ένδυσης, με πλήρη εκτύπωση του λογοτύπου και των χρωμάτων σας. Η παραγωγή γίνεται στις εγκαταστάσεις μας στις Αχαρνές, με εμπειρία άνω των 30 ετών στη συσκευασία.',
    ],
    en: [
      'Kids stores have something other sectors do not: colour, a playful tone and an identity that has to come across instantly. The bag is one of the first places that shows.',
      'We manufacture paper bags for childrenswear, baby goods, kids footwear and teen fashion stores, fully printed with your logo and colours. Production takes place at our facility in Acharnes, backed by more than 30 years of packaging experience.',
    ],
  },
  sections: [
    {
      heading: {
        el: 'Χρώμα και αντοχή μαζί',
        en: 'Colour and durability together',
      },
      body: {
        el: [
          'Τα σχέδια για παιδικά καταστήματα είναι συνήθως πολύχρωμα, με έντονα γραφικά και μεγάλες επιφάνειες χρώματος. Αυτό απαιτεί προσεκτική εκτύπωση, ώστε τα χρώματα να βγαίνουν ζωντανά και σταθερά σε όλη την παραγωγή.',
          'Ταυτόχρονα, οι σακούλες αυτές συχνά μεταφέρουν όγκο — ρούχα, κουτιά παπουτσιών, παιχνίδια. Επιλέγουμε χαρτί και λαβές που αντέχουν το βάρος χωρίς να χάνουν την εμφάνισή τους.',
        ],
        en: [
          'Designs for kids stores are typically colourful, with bold graphics and large areas of solid colour. That calls for careful printing so the colours come out vivid and stay consistent across the whole run.',
          'These bags also tend to carry bulk — clothes, shoeboxes, toys. We select paper and handles that take the weight without losing their appearance.',
        ],
      },
    },
    {
      heading: {
        el: 'Μεγέθη και επιλογές',
        en: 'Sizes and options',
      },
      body: {
        el: [
          `Στα παιδικά καταστήματα συνήθως χρειάζονται περισσότερα από ένα μεγέθη — ένα μικρό για αξεσουάρ και ένα μεγαλύτερο για ρούχα ή κουτιά. Διαθέτουμε τυποποιημένα μεγέθη (${SPEC_SIZES} εκ.) και κατασκευάζουμε και custom διαστάσεις.`,
          'Οι λαβές επιλέγονται ανάμεσα σε κορδέλα, κορδόνι, στριφτή χάρτινη λαβή και λάστιχο, ενώ το φινίρισμα μπορεί να είναι ματ, γυαλιστερό ή πλαστικοποιημένο για επιπλέον αντοχή.',
        ],
        en: [
          `Kids stores usually need more than one size — a small one for accessories and a larger one for clothes or boxes. We offer standard sizes (${SPEC_SIZES} cm) and also produce custom dimensions.`,
          'Handles can be ribbon, cord, twisted paper or elastic, while the finish can be matte, glossy or laminated for extra durability.',
        ],
      },
    },
  ],
  highlights: {
    el: [
      'Πολύχρωμη εκτύπωση έως 4 χρώματα',
      'Μεγέθη για ρούχα, παπούτσια και αξεσουάρ',
      'Λαβές: κορδέλα, κορδόνι, στριφτή, λάστιχο',
      'Πλαστικοποίηση για επιπλέον αντοχή',
      'Πιστή απόδοση των χρωμάτων του brand σας',
      'Δυνατότητα custom διαστάσεων',
    ],
    en: [
      'Full-colour printing up to 4 colours',
      'Sizes for clothing, footwear and accessories',
      'Handles: ribbon, cord, twisted, elastic',
      'Lamination for extra durability',
      'Faithful reproduction of your brand colours',
      'Custom dimensions available',
    ],
  },
  galleryHeading: { el: 'Δείγματα από παιδικά καταστήματα', en: 'Samples from kids stores' },
  galleryNote: {
    el: 'Σακούλες που έχουμε κατασκευάσει για παιδικά καταστήματα, είδη μπεμπέ και εφηβική ένδυση.',
    en: 'Bags we have produced for kids stores, baby goods and teen fashion.',
  },
  faq: [
    {
      q: { el: 'Μπορείτε να τυπώσετε πολύχρωμα σχέδια;', en: 'Can you print multi-colour designs?' },
      a: {
        el: 'Ναι. Η εκτύπωση γίνεται από 1 έως 4 χρώματα, που καλύπτει τα περισσότερα σχέδια παιδικών καταστημάτων. Στα δείγματα θα δείτε έντονα πολύχρωμα σχέδια που έχουμε παράξει.',
        en: 'Yes. Printing runs from 1 to 4 colours, which covers most kids-store designs. The samples show vivid multi-colour work we have produced.',
      },
    },
    {
      q: { el: 'Αντέχουν οι σακούλες σε βάρος;', en: 'Are the bags strong enough?' },
      a: {
        el: 'Επιλέγουμε χαρτί και τύπο λαβής ανάλογα με τη χρήση. Για βαρύτερο περιεχόμενο προτείνουμε ενισχυμένη κατασκευή και πλαστικοποίηση, που αυξάνει την αντοχή.',
        en: 'We select the paper and handle type according to the intended use. For heavier contents we recommend a reinforced build and lamination, which increases durability.',
      },
    },
    {
      q: { el: 'Μπορώ να παραγγείλω περισσότερα από ένα μεγέθη;', en: 'Can I order more than one size?' },
      a: {
        el: 'Ναι, και είναι πολύ συνηθισμένο στα παιδικά καταστήματα. Μπορείτε να συνδυάσετε μικρότερα και μεγαλύτερα μεγέθη με το ίδιο σχέδιο εκτύπωσης.',
        en: 'Yes, and it is very common for kids stores. You can combine smaller and larger sizes using the same printed design.',
      },
    },
    {
      q: { el: 'Πώς ζητάω προσφορά;', en: 'How do I request a quote?' },
      a: {
        el: 'Συμπληρώνετε τη φόρμα προσφοράς επιλέγοντας τύπο σακούλας, μέγεθος, λαβή, φινίρισμα και εκτύπωση, ή τηλεφωνείτε στο 210 244 3550.',
        en: 'Fill in the quote form selecting bag type, size, handle, finish and printing, or call us on +30 210 244 3550.',
      },
    },
  ],
  altPrefix: { el: 'Χάρτινη σακούλα για παιδικά', en: 'Paper bag for kids store' },
  images: [
    '/paper_product/paidika/sakoula-kid-club.webp',
    '/paper_product/paidika/sakoula-kid-club-2.webp',
    '/paper_product/paidika/sakoula-kid-club-3.webp',
    '/paper_product/paidika/sakoula-kid-club-4.webp',
    '/paper_product/paidika/sakoula-oneiropagida.webp',
    '/paper_product/paidika/sakoula-oneiropagida-2.webp',
    '/paper_product/paidika/sakoula-oneiropagida-3.webp',
    '/paper_product/paidika/sakoula-oneiropagida-4.webp',
    '/paper_product/paidika/sakoula-oneiropagida-5.webp',
    '/paper_product/paidika/sakoula-oneiropagida-6.webp',
    '/paper_product/paidika/sakoula-oneiropagida-7.webp',
    '/paper_product/paidika/sakoula-capolino.webp',
    '/paper_product/paidika/sakoula-lilipoupoli.webp',
    '/paper_product/paidika/sakoula-lilipoupoli-2.webp',
    '/paper_product/paidika/sakoula-lilipoupoli-3.webp',
    '/paper_product/paidika/sakoula-sash-club.webp',
    '/paper_product/paidika/sakoula-sash-club-2.webp',
    '/paper_product/paidika/sakoula-sash-club-3.webp',
    '/paper_product/paidika/sakoula-sash-club-4.webp',
    '/paper_product/paidika/sakoula-tom-and-jerry.webp',
    '/paper_product/paidika/sakoula-tom-and-jerry-2.webp',
    '/paper_product/paidika/sakoula-azure-2.webp',
    '/paper_product/paidika/sakoula-bee-fashion.webp',
    '/paper_product/paidika/sakoula-brands.webp',
    '/paper_product/paidika/sakoula-cool-step.webp',
    '/paper_product/paidika/sakoula-dodo-squawk-fashion.webp',
    '/paper_product/paidika/sakoula-fragolina.webp',
    '/paper_product/paidika/sakoula-paidikos-paradeisos.webp',
    '/paper_product/paidika/sakoula-pallina.webp',
    '/paper_product/paidika/sakoula-skertso-kids-fashion.webp',
    '/paper_product/paidika/sakoula-sole-kids-footwear.webp',
    '/paper_product/paidika/sakoula-this-is-my-smile.webp',
  ],
};

export const CATEGORIES: Record<string, CategoryContent> = {
  optika: OPTIKA,
  paidika: PAIDIKA,
};
