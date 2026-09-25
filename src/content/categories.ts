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
    '/paper_product/optika/sakoula-optofree.webp',
    '/paper_product/optika/sakoula-occhi-eleganti.webp',
    '/paper_product/optika/sakoula-optical-room.webp',
    '/paper_product/optika/sakoula-optics.webp',
    '/paper_product/optika/sakoula-optics-poly.webp',
    '/paper_product/optika/sakoula-excellens.webp',
    '/paper_product/optika/sakoula-eye-like-u.webp',
    '/paper_product/optika/sakoula-bottega-ottica.webp',
    '/paper_product/optika/sakoula-kypraios-eye-fashion.webp',
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
    '/paper_product/paidika/sakoula-kid-club-4.webp',
    '/paper_product/paidika/sakoula-oneiropagida.webp',
    '/paper_product/paidika/sakoula-oneiropagida-4.webp',
    '/paper_product/paidika/sakoula-oneiropagida-6.webp',
    '/paper_product/paidika/sakoula-oneiropagida-7.webp',
    '/paper_product/paidika/sakoula-capolino.webp',
    '/paper_product/paidika/sakoula-lilipoupoli-3.webp',
    '/paper_product/paidika/sakoula-sash-club.webp',
    '/paper_product/paidika/sakoula-sash-club-4.webp',
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
    '/paper_product/paidika/sakoula-babys-smile.webp',
    '/paper_product/paidika/sakoula-lina-liri.webp',
    '/paper_product/paidika/sakoula-margerita.webp',
    '/paper_product/paidika/sakoula-mia-fora-ki-enan-kairo.webp',
    '/paper_product/paidika/sakoula-skertso-kids-fashion-2.webp',
    '/paper_product/paidika/sakoula-tom-and-jerry-3.webp',
  ],
};

export const CATEGORIES: Record<string, CategoryContent> = {
  optika: OPTIKA,
  paidika: PAIDIKA,
};

/* ────────────────────────── ΑΝΔΡΙΚΑ ────────────────────────── */

export const ANDRIKA: CategoryContent = {
  slug: 'andrika',
  eyebrow: { el: 'Κατηγορία', en: 'Category' },
  h1: {
    el: 'Σακούλες για Ανδρικά Καταστήματα',
    en: 'Bags for Menswear Stores',
  },
  intro: {
    el: [
      'Ένα κοστούμι, ένα σακάκι ή ένα ζευγάρι παπούτσια χρειάζονται συσκευασία που αντέχει το βάρος τους και δεν τσαλακώνει το περιεχόμενο. Στα ανδρικά καταστήματα η σακούλα πρέπει να είναι εξίσου προσεγμένη με το ρούχο που μεταφέρει.',
      'Στη Laderos Bags κατασκευάζουμε χάρτινες σακούλες για καταστήματα ανδρικής ένδυσης και υπόδησης, με εκτύπωση του λογοτύπου σας και μεγέθη που καλύπτουν από ένα πουκάμισο μέχρι ολόκληρο κοστούμι. Με πάνω από 30 χρόνια εμπειρίας και δική μας παραγωγή στις Αχαρνές, ελέγχουμε κάθε στάδιο της κατασκευής.',
    ],
    en: [
      'A suit, a jacket or a pair of shoes needs packaging that can carry the weight without creasing what is inside. In a menswear store the bag should be as considered as the garment it carries.',
      'At Laderos Bags we manufacture paper bags for men’s clothing and footwear stores, printed with your logo and available in sizes that cover everything from a single shirt to a full suit. With over 30 years of experience and our own production facility in Acharnes, we control every stage of manufacturing.',
    ],
  },
  sections: [
    {
      heading: {
        el: 'Μεγέθη που καλύπτουν όλη τη γκάμα',
        en: 'Sizes that cover the full range',
      },
      body: {
        el: [
          'Τα ανδρικά καταστήματα έχουν από τα πιο απαιτητικά μεγέθη: το ίδιο κατάστημα μπορεί να χρειάζεται μικρή σακούλα για αξεσουάρ και μεγάλη για παλτό. Γι\' αυτό δουλεύουμε με ευρεία γκάμα διαστάσεων, από 24x24x10 έως 60x50x15 εκ.',
          'Όταν το προϊόν είναι βαρύ — υποδήματα, δερμάτινα, χειμερινά πανωφόρια — η βάση και οι λαβές είναι αυτά που κάνουν τη διαφορά. Επιλέγουμε μαζί σας τον συνδυασμό που αντέχει χωρίς να χάνει σε εμφάνιση.',
        ],
        en: [
          'Menswear stores have some of the most demanding size requirements: the same shop may need a small bag for accessories and a large one for a coat. That is why we work across a wide range of dimensions, from 24x24x10 up to 60x50x15 cm.',
          'When the product is heavy — footwear, leather goods, winter coats — the base and the handles are what make the difference. We choose the combination with you that holds up without compromising the look.',
        ],
      },
    },
    {
      heading: {
        el: 'Εκτύπωση που ταιριάζει στο brand σας',
        en: 'Printing that matches your brand',
      },
      body: {
        el: [
          `Διαθέτουμε τυποποιημένα μεγέθη (${SPEC_SIZES} εκ.) και κατασκευάζουμε σακούλα σε εντελώς δικές σας διαστάσεις όταν χρειάζεται. Οι λαβές μπορεί να είναι κορδέλα, κορδόνι, στριφτή χάρτινη ή λάστιχο.`,
          'Η εκτύπωση γίνεται από 1 έως 4 χρώματα. Για πιο απαιτητικές δουλειές προσφέρουμε θερμοτυπία, ανάγλυφο λογότυπο και εσωτερική εκτύπωση, ενώ το φινίρισμα μπορεί να είναι ματ, γυαλιστερό ή πλαστικοποιημένο.',
        ],
        en: [
          `We offer standard sizes (${SPEC_SIZES} cm) and produce fully custom dimensions when needed. Handles can be ribbon, cord, twisted paper or elastic.`,
          'Printing runs from 1 to 4 colours. For more demanding work we offer hot stamping, embossed logos and inside printing, while the finish can be matte, glossy or laminated.',
        ],
      },
    },
  ],
  highlights: {
    el: [
      'Μεγέθη από αξεσουάρ έως ολόκληρο κοστούμι',
      'Ενισχυμένη βάση για βαριά προϊόντα',
      'Λαβές: κορδέλα, κορδόνι, στριφτή, λάστιχο',
      'Εκτύπωση λογοτύπου από 1 έως 4 χρώματα',
      'Θερμοτυπία & ανάγλυφο λογότυπο',
      'Φινίρισμα ματ, γυαλιστερό ή πλαστικοποιημένο',
    ],
    en: [
      'Sizes from accessories to a full suit',
      'Reinforced base for heavy products',
      'Handles: ribbon, cord, twisted, elastic',
      'Logo printing from 1 to 4 colours',
      'Hot stamping & embossed logo',
      'Matte, glossy or laminated finish',
    ],
  },
  galleryHeading: { el: 'Δείγματα από ανδρικά καταστήματα', en: 'Samples from menswear stores' },
  galleryNote: {
    el: 'Σακούλες που έχουμε κατασκευάσει για καταστήματα ανδρικής ένδυσης και υπόδησης.',
    en: 'Bags we have produced for men’s clothing and footwear stores.',
  },
  faq: [
    {
      q: { el: 'Αντέχει η σακούλα βαριά ρούχα και παπούτσια;', en: 'Will the bag hold heavy clothing and shoes?' },
      a: {
        el: 'Ναι, εφόσον επιλεγεί ο σωστός συνδυασμός χαρτιού, βάσης και λαβής. Μας λέτε τι θα μεταφέρει η σακούλα και προτείνουμε την κατάλληλη κατασκευή.',
        en: 'Yes, provided the right combination of paper, base and handle is chosen. Tell us what the bag will carry and we will recommend the appropriate construction.',
      },
    },
    {
      q: { el: 'Μπορώ να παραγγείλω πολλά μεγέθη με το ίδιο σχέδιο;', en: 'Can I order several sizes with the same design?' },
      a: {
        el: 'Ναι. Το ίδιο σχέδιο εκτύπωσης μπορεί να εφαρμοστεί σε διαφορετικά μεγέθη, ώστε το κατάστημα να έχει ενιαία εικόνα σε όλη τη γκάμα.',
        en: 'Yes. The same print design can be applied across different sizes, so your store keeps a consistent look across the whole range.',
      },
    },
    {
      q: { el: 'Τι μεγέθη είναι διαθέσιμα;', en: 'What sizes are available?' },
      a: {
        el: `Διαθέτουμε τυποποιημένα μεγέθη (${SPEC_SIZES} εκ.) και κατασκευάζουμε σακούλες σε εντελώς δικές σας διαστάσεις όταν χρειάζεται κάτι ειδικό.`,
        en: `We stock standard sizes (${SPEC_SIZES} cm) and manufacture bags in fully custom dimensions when something specific is required.`,
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
  images: [
    '/paper_product/andrika/sakoula-guy-laroche.webp',
    '/paper_product/andrika/sakoula-lacoste.webp',
    '/paper_product/andrika/sakoula-the-bostonians.webp',
    '/paper_product/andrika/sakoula-kingsman.webp',
    '/paper_product/andrika/sakoula-beneto-maretti.webp',
    '/paper_product/andrika/sakoula-beneto-maretti-2.webp',
    '/paper_product/andrika/sakoula-intro-mens-fashion.webp',
    '/paper_product/andrika/sakoula-fikos-mens-world.webp',
    '/paper_product/andrika/sakoula-mans-house.webp',
    '/paper_product/andrika/sakoula-dressman.webp',
    '/paper_product/andrika/sakoula-morris.webp',
    '/paper_product/andrika/sakoula-status.webp',
    '/paper_product/andrika/sakoula-look.webp',
    '/paper_product/andrika/sakoula-playboy.webp',
    '/paper_product/andrika/sakoula-golden-danias.webp',
    '/paper_product/andrika/sakoula-balabanos.webp',
    '/paper_product/andrika/sakoula-metallidis.webp',
    '/paper_product/andrika/sakoula-gampriatiko-saloni-iliopoulos.webp',
  ],
  altPrefix: { el: 'Χάρτινη σακούλα για ανδρικό κατάστημα', en: 'Paper bag for menswear store' },
};

/* ───────────────────────── ΓΥΝΑΙΚΕΙΑ ───────────────────────── */

export const GYNAIKEIA: CategoryContent = {
  slug: 'gynaikeia',
  eyebrow: { el: 'Κατηγορία', en: 'Category' },
  h1: {
    el: 'Σακούλες για Γυναικεία Καταστήματα',
    en: 'Bags for Womenswear Stores',
  },
  intro: {
    el: [
      'Σε μια γυναικεία boutique η σακούλα είναι μέρος της εμπειρίας αγοράς. Συνοδεύει το προϊόν μέχρι το σπίτι και συχνά επιστρέφει στο κατάστημα, γι\' αυτό αξίζει να είναι προσεγμένη σε κάθε λεπτομέρεια.',
      'Στη Laderos Bags κατασκευάζουμε χάρτινες σακούλες για καταστήματα γυναικείας ένδυσης, εσωρούχων και αξεσουάρ, με εκτύπωση του λογοτύπου σας και φινιρίσματα που δίνουν αίσθηση πολυτελείας. Με πάνω από 30 χρόνια εμπειρίας και δική μας παραγωγή στις Αχαρνές, αναλαμβάνουμε όλη τη διαδικασία.',
    ],
    en: [
      'In a womenswear boutique the bag is part of the shopping experience. It carries the product home and often comes back to the store, so it is worth getting every detail right.',
      'At Laderos Bags we manufacture paper bags for women’s clothing, lingerie and accessory stores, printed with your logo and finished to feel premium. With over 30 years of experience and our own production facility in Acharnes, we handle the entire process.',
    ],
  },
  sections: [
    {
      heading: {
        el: 'Η λεπτομέρεια κάνει τη διαφορά',
        en: 'The detail makes the difference',
      },
      body: {
        el: [
          'Στη γυναικεία ένδυση η αισθητική της συσκευασίας μετράει όσο και το ίδιο το ρούχο. Η επιλογή λαβής — σατέν κορδέλα, κορδόνι ή στριφτή χάρτινη — αλλάζει εντελώς τον χαρακτήρα της σακούλας.',
          'Το ίδιο ισχύει για το φινίρισμα: μια ματ πλαστικοποίηση δίνει διακριτική, βελούδινη αίσθηση, ενώ το γυαλιστερό τονίζει τα χρώματα. Συνδυάζονται και τα δύο με θερμοτυπία ή ανάγλυφο λογότυπο για ακόμη πιο premium αποτέλεσμα.',
        ],
        en: [
          'In womenswear the look of the packaging matters as much as the garment itself. The handle you choose — satin ribbon, cord or twisted paper — completely changes the character of the bag.',
          'The same goes for the finish: a matte lamination gives a discreet, velvety feel, while gloss makes colours pop. Both can be combined with hot stamping or an embossed logo for an even more premium result.',
        ],
      },
    },
    {
      heading: {
        el: 'Από το μικρό αξεσουάρ μέχρι το παλτό',
        en: 'From a small accessory to a coat',
      },
      body: {
        el: [
          `Διαθέτουμε τυποποιημένα μεγέθη (${SPEC_SIZES} εκ.) που καλύπτουν από μικρά κουτιά κοσμημάτων και εσώρουχα μέχρι ογκώδη πανωφόρια, ενώ κατασκευάζουμε και σακούλα σε εντελώς δικές σας διαστάσεις.`,
          'Η εκτύπωση γίνεται από 1 έως 4 χρώματα και μπορεί να περιλαμβάνει λογότυπο, διεύθυνση, τηλέφωνο και social media — όπως βλέπετε στα δείγματα παρακάτω.',
        ],
        en: [
          `We offer standard sizes (${SPEC_SIZES} cm) covering everything from small jewellery boxes and lingerie to bulky outerwear, and we also produce bags in fully custom dimensions.`,
          'Printing runs from 1 to 4 colours and can include your logo, address, phone number and social media — as shown in the samples below.',
        ],
      },
    },
  ],
  highlights: {
    el: [
      'Λαβές: σατέν κορδέλα, κορδόνι, στριφτή, λάστιχο',
      'Φινίρισμα ματ, γυαλιστερό ή πλαστικοποιημένο',
      'Θερμοτυπία & ανάγλυφο λογότυπο',
      'Εκτύπωση λογοτύπου από 1 έως 4 χρώματα',
      'Δυνατότητα εσωτερικής εκτύπωσης',
      'Μεγέθη για αξεσουάρ έως πανωφόρια',
    ],
    en: [
      'Handles: satin ribbon, cord, twisted, elastic',
      'Matte, glossy or laminated finish',
      'Hot stamping & embossed logo',
      'Logo printing from 1 to 4 colours',
      'Inside printing available',
      'Sizes from accessories to outerwear',
    ],
  },
  galleryHeading: { el: 'Δείγματα από γυναικεία καταστήματα', en: 'Samples from womenswear stores' },
  galleryNote: {
    el: 'Σακούλες που έχουμε κατασκευάσει για boutique γυναικείας ένδυσης, εσωρούχων και αξεσουάρ.',
    en: 'Bags we have produced for women’s clothing, lingerie and accessory boutiques.',
  },
  faq: [
    {
      q: { el: 'Μπορώ να βάλω σατέν κορδέλα σε συγκεκριμένο χρώμα;', en: 'Can I have satin ribbon in a specific colour?' },
      a: {
        el: 'Οι λαβές επιλέγονται ανάμεσα σε κορδέλα, κορδόνι, στριφτή χάρτινη και λάστιχο. Πείτε μας το χρώμα που έχετε στο μυαλό σας και θα σας ενημερώσουμε για τις διαθέσιμες επιλογές.',
        en: 'Handles are chosen from ribbon, cord, twisted paper and elastic. Tell us the colour you have in mind and we will let you know the available options.',
      },
    },
    {
      q: { el: 'Ποια διαφορά έχει το ματ από το γυαλιστερό φινίρισμα;', en: 'What is the difference between matte and glossy finish?' },
      a: {
        el: 'Το ματ δίνει διακριτική, βελούδινη υφή και συνήθως προτιμάται για πιο minimal ταυτότητες. Το γυαλιστερό τονίζει την ένταση των χρωμάτων και κάνει το λογότυπο πιο εμφανές.',
        en: 'Matte gives a discreet, velvety texture and is usually preferred for more minimal identities. Gloss intensifies colours and makes the logo stand out more.',
      },
    },
    {
      q: { el: 'Τι μεγέθη είναι διαθέσιμα;', en: 'What sizes are available?' },
      a: {
        el: `Διαθέτουμε τυποποιημένα μεγέθη (${SPEC_SIZES} εκ.) και κατασκευάζουμε σακούλες σε εντελώς δικές σας διαστάσεις όταν χρειάζεται κάτι ειδικό.`,
        en: `We stock standard sizes (${SPEC_SIZES} cm) and manufacture bags in fully custom dimensions when something specific is required.`,
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
  images: [
    '/paper_product/woman/sakoula-annas-secret.webp',
    '/paper_product/woman/sakoula-illusions-d.webp',
    '/paper_product/woman/sakoula-brividi-di-donna.webp',
    '/paper_product/woman/sakoula-katrin-gruppo-moda.webp',
    '/paper_product/woman/sakoula-iza-collection.webp',
    '/paper_product/woman/sakoula-renatta.webp',
    '/paper_product/woman/sakoula-roubi-tommasini.webp',
    '/paper_product/woman/sakoula-m-boutique.webp',
    '/paper_product/woman/sakoula-xontou-boutique.webp',
    '/paper_product/woman/sakoula-assi-mina-laskaraki.webp',
    '/paper_product/woman/sakoula-andrei.webp',
    '/paper_product/woman/sakoula-kostis-shop.webp',
    '/paper_product/woman/sakoula-ola-se-1.webp',
  ],
  altPrefix: { el: 'Χάρτινη σακούλα για γυναικείο κατάστημα', en: 'Paper bag for womenswear store' },
};

/* ──────────────────────── ΟΙΚΟΛΟΓΙΚΑ ──────────────────────── */

/**
 * Note: no certification (FSC, recycled-content percentage) or compostability
 * claim is made here, because we have no source for one. The page describes
 * only what is verifiable: the material is paper, lamination is optional, and
 * a bag left unlaminated stays a single-material paper product.
 */
export const OIKOLOGIKA: CategoryContent = {
  slug: 'oikologika',
  eyebrow: { el: 'Κατηγορία', en: 'Category' },
  h1: {
    el: 'Οικολογικές Χάρτινες Σακούλες',
    en: 'Eco-Friendly Paper Bags',
  },
  intro: {
    el: [
      'Όλο και περισσότερες επιχειρήσεις θέλουν η συσκευασία τους να λέει κάτι για τις αξίες τους. Η οικολογική γραμμή μας βασίζεται στην απλή λογική: χαρτί, χωρίς περιττά στρώματα, με την υφή του υλικού να μένει ορατή.',
      'Στη Laderos Bags κατασκευάζουμε χάρτινες σακούλες σε kraft εμφάνιση, με εκτύπωση του λογοτύπου σας. Με πάνω από 30 χρόνια εμπειρίας και δική μας παραγωγή στις Αχαρνές, προσαρμόζουμε την κατασκευή στο τι ακριβώς χρειάζεται το κατάστημά σας.',
    ],
    en: [
      'More and more businesses want their packaging to say something about their values. Our eco line is built on a simple idea: paper, without unnecessary layers, with the texture of the material left visible.',
      'At Laderos Bags we manufacture paper bags with a kraft look, printed with your logo. With over 30 years of experience and our own production facility in Acharnes, we adapt the construction to exactly what your store needs.',
    ],
  },
  sections: [
    {
      heading: {
        el: 'Χαρτί που μένει χαρτί',
        en: 'Paper that stays paper',
      },
      body: {
        el: [
          'Η πλαστικοποίηση είναι προαιρετική. Όταν την παραλείπετε, η σακούλα παραμένει ένα υλικό — χαρτί — και επομένως ανακυκλώνεται μαζί με το υπόλοιπο χαρτί, χωρίς να χρειάζεται διαχωρισμός.',
          'Η kraft εμφάνιση δουλεύει ιδιαίτερα καλά με λιτά σχέδια: ένα λογότυπο σε ένα ή δύο χρώματα πάνω στο φυσικό χρώμα του χαρτιού έχει συχνά μεγαλύτερο αντίκτυπο από μια γεμάτη εκτύπωση.',
        ],
        en: [
          'Lamination is optional. When you leave it off, the bag stays a single material — paper — and can therefore be recycled with the rest of your paper waste, with no separation needed.',
          'The kraft look works particularly well with restrained designs: a logo in one or two colours on the natural paper tone often has more impact than full coverage printing.',
        ],
      },
    },
    {
      heading: {
        el: 'Ίδιες δυνατότητες, οικολογική εμφάνιση',
        en: 'Same options, eco aesthetic',
      },
      body: {
        el: [
          `Η οικολογική γραμμή δεν σημαίνει λιγότερες επιλογές. Διαθέτουμε τα ίδια τυποποιημένα μεγέθη (${SPEC_SIZES} εκ.) και κατασκευάζουμε σακούλα σε εντελώς δικές σας διαστάσεις.`,
          'Για τις λαβές μπορείτε να επιλέξετε στριφτή χάρτινη λαβή — που κρατά τη σακούλα εξ ολοκλήρου χάρτινη — ή κορδόνι, κορδέλα και λάστιχο. Η εκτύπωση γίνεται από 1 έως 4 χρώματα, με δυνατότητα θερμοτυπίας και ανάγλυφου λογοτύπου.',
        ],
        en: [
          `The eco line does not mean fewer options. We offer the same standard sizes (${SPEC_SIZES} cm) and produce bags in fully custom dimensions.`,
          'For handles you can choose a twisted paper handle — which keeps the bag entirely paper — or cord, ribbon and elastic. Printing runs from 1 to 4 colours, with hot stamping and embossed logos available.',
        ],
      },
    },
  ],
  highlights: {
    el: [
      'Kraft εμφάνιση με ορατή υφή χαρτιού',
      'Πλαστικοποίηση προαιρετική',
      'Στριφτή χάρτινη λαβή για σακούλα εξ ολοκλήρου χάρτινη',
      'Εκτύπωση λογοτύπου από 1 έως 4 χρώματα',
      'Θερμοτυπία & ανάγλυφο λογότυπο',
      'Όλα τα μεγέθη της βασικής γκάμας',
    ],
    en: [
      'Kraft look with visible paper texture',
      'Lamination optional',
      'Twisted paper handle for an all-paper bag',
      'Logo printing from 1 to 4 colours',
      'Hot stamping & embossed logo',
      'Every size from the standard range',
    ],
  },
  galleryHeading: { el: 'Δείγματα οικολογικής γραμμής', en: 'Samples from the eco line' },
  galleryNote: {
    el: 'Σακούλες σε kraft εμφάνιση που έχουμε κατασκευάσει για καταστήματα διαφόρων κλάδων.',
    en: 'Kraft-look bags we have produced for stores across a range of sectors.',
  },
  faq: [
    {
      q: { el: 'Ανακυκλώνεται η σακούλα;', en: 'Is the bag recyclable?' },
      a: {
        el: 'Όταν επιλέγετε τη σακούλα χωρίς πλαστικοποίηση, πρόκειται για προϊόν ενός υλικού — χαρτί — και ανακυκλώνεται μαζί με το υπόλοιπο χαρτί. Αν προστεθεί πλαστικοποίηση ή λαβή από άλλο υλικό, αυτό αλλάζει.',
        en: 'When you choose the bag without lamination it is a single-material product — paper — and goes into paper recycling. If lamination or a handle made from another material is added, that changes.',
      },
    },
    {
      q: { el: 'Μπορώ να έχω σακούλα εξ ολοκλήρου χάρτινη;', en: 'Can I have an all-paper bag?' },
      a: {
        el: 'Ναι. Επιλέγοντας στριφτή χάρτινη λαβή και παραλείποντας την πλαστικοποίηση, η σακούλα αποτελείται μόνο από χαρτί.',
        en: 'Yes. By choosing a twisted paper handle and leaving out lamination, the bag consists of paper only.',
      },
    },
    {
      q: { el: 'Η οικολογική γραμμή έχει λιγότερες επιλογές εκτύπωσης;', en: 'Does the eco line have fewer printing options?' },
      a: {
        el: 'Όχι. Ισχύουν οι ίδιες δυνατότητες: εκτύπωση από 1 έως 4 χρώματα, θερμοτυπία, ανάγλυφο λογότυπο και εσωτερική εκτύπωση.',
        en: 'No. The same capabilities apply: printing from 1 to 4 colours, hot stamping, embossed logos and inside printing.',
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
  images: [
    '/paper_product/oikologika/sakoula-ikorganic.webp',
    '/paper_product/oikologika/sakoula-surf-skate-shop.webp',
    '/paper_product/oikologika/sakoula-mans-house-no-jeans.webp',
    '/paper_product/oikologika/sakoula-beneto-maretti.webp',
    '/paper_product/oikologika/sakoula-kostis-fashion-shop.webp',
    '/paper_product/oikologika/sakoula-kostis-shop.webp',
    '/paper_product/oikologika/sakoula-privee-lingerie.webp',
    '/paper_product/oikologika/sakoula-kid-club.webp',
    '/paper_product/oikologika/sakoula-oneiropagida.webp',
  ],
  altPrefix: { el: 'Οικολογική χάρτινη σακούλα', en: 'Eco-friendly paper bag' },
};
