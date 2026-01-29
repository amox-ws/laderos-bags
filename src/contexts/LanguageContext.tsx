// Language Context - Laderos Bags i18n v3 - rebuild
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'el' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}


const translations: Record<Language, Record<string, string>> = {
  el: {
    // Navigation
    'nav.home': 'Αρχική',
    'nav.about': 'Η Εταιρεία',
    'nav.products': 'Προϊόντα',
    'nav.contact': 'Επικοινωνία',
    
    // Hero
    'hero.title': 'Επαγγελματικές Λύσεις Συσκευασίας',
    'hero.subtitle': 'Κατασκευάζουμε υψηλής ποιότητας πλαστικές και χάρτινες σακούλες για επιχειρήσεις σε όλη την Ελλάδα',
    'hero.cta.products': 'Τα Προϊόντα μας',
    'hero.cta.contact': 'Επικοινωνήστε μαζί μας',
    
    // Features
    'features.title': 'Γιατί να μας επιλέξετε',
    'features.quality.title': 'Υψηλή Ποιότητα',
    'features.quality.desc': 'Χρησιμοποιούμε πρώτες ύλες υψηλής ποιότητας για ανθεκτικά προϊόντα',
    'features.custom.title': 'Εξατομικευμένες Λύσεις',
    'features.custom.desc': 'Προσαρμοζόμαστε στις ανάγκες της επιχείρησής σας',
    'features.reliable.title': 'Αξιοπιστία',
    'features.reliable.desc': 'Έγκαιρη παράδοση και συνεπής εξυπηρέτηση',
    'features.eco.title': 'Περιβαλλοντική Ευαισθησία',
    'features.eco.desc': 'Οικολογικές επιλογές και βιώσιμες πρακτικές',
    
    // Products Preview
    'products.title': 'Τα Προϊόντα μας',
    'products.subtitle': 'Ολοκληρωμένες λύσεις συσκευασίας για κάθε επιχειρηματική ανάγκη',
    'products.section.title': 'Χάρτινες & Πλαστικές Σακούλες Φτιαγμένες στα Μέτρα σας',
    'products.section.text1': 'Στη Laderos Bags, αντιμετωπίζουμε τη συσκευασία ως έναν ουσιαστικό τρόπο να αναδείξετε την ταυτότητα της επιχείρησής σας. Κατασκευάζουμε χάρτινες και πλαστικές σακούλες υψηλής ποιότητας, σχεδιασμένες αποκλειστικά σύμφωνα με τις ανάγκες σας.',
    'products.section.text2': 'Από ανθεκτικές πλαστικές σακούλες έως κομψές χάρτινες λύσεις, προσφέρουμε εξατομικευμένη παραγωγή, που συνδυάζει λειτουργικότητα, αισθητική και επαγγελματική παρουσία. Δημιουργούμε συσκευασίες που ξεχωρίζουν και ενισχύουν το brand σας.',
    'products.plastic.title': 'Πλαστικές Σακούλες',
    'products.plastic.desc': 'Ανθεκτικές πλαστικές σακούλες σε διάφορα μεγέθη και σχέδια',
    'products.paper.title': 'Χάρτινες Σακούλες',
    'products.paper.desc': 'Οικολογικές χάρτινες σακούλες υψηλής αντοχής',
    'products.custom.title': 'Custom Λύσεις',
    'products.custom.desc': 'Εξατομικευμένες συσκευασίες με το λογότυπό σας',
    'products.viewall': 'Δείτε όλα τα προϊόντα',
    'products.explore': 'Εξερευνήστε',
    
    // About Page
    'about.hero.title': '30 ΧΡΟΝΙΑ ΣΤΗΝ ΠΑΡΑΓΩΓΗ ΣΑΚΟΥΛΑΣ',
    'about.hero.subtitle': 'Εμπειρία, ποιότητα και αξιοπιστία στην κατασκευή συσκευασιών',
    'about.videoPlaceholder': 'Βίντεο σύντομα διαθέσιμο',
    'about.whoWeAre.title': 'Ποιοι Είμαστε',
    'about.whoWeAre.text': 'Η Laderos Bags δραστηριοποιείται εδώ και περισσότερα από 30 χρόνια στην παραγωγή χάρτινων και πλαστικών σακουλών. Με σύγχρονο μηχανολογικό εξοπλισμό και εξειδικευμένο προσωπικό, προσφέρουμε αξιόπιστες λύσεις συσκευασίας για επιχειρήσεις σε όλη την Ελλάδα.',
    'about.whatWeDo.title': 'Τι Κάνουμε',
    'about.services.customManufacturing.title': 'Εξατομικευμένη Παραγωγή',
    'about.services.customManufacturing.desc': 'Κατασκευάζουμε σακούλες σύμφωνα με τις ακριβείς προδιαγραφές σας.',
    'about.services.paperPlastic.title': 'Χάρτινες & Πλαστικές Λύσεις',
    'about.services.paperPlastic.desc': 'Πλήρης γκάμα υλικών και σχεδίων για κάθε ανάγκη.',
    'about.services.qualityConsistency.title': 'Ποιότητα & Συνέπεια',
    'about.services.qualityConsistency.desc': 'Διασφαλίζουμε υψηλά πρότυπα σε κάθε παραγγελία.',
    'about.services.b2bPartnerships.title': 'B2B Συνεργασίες',
    'about.services.b2bPartnerships.desc': 'Μακροχρόνιες σχέσεις εμπιστοσύνης με επιχειρήσεις.',
    'about.production.title': 'Η Παραγωγή μας',
    'about.production.text': 'Σύγχρονες εγκαταστάσεις και μηχανήματα τελευταίας τεχνολογίας για αποτελεσματική και ποιοτική παραγωγή.',
    'about.whyWork.title': 'Γιατί να Συνεργαστείτε Μαζί μας',
    'about.whyWork.text': 'Η εμπειρία 30 ετών μας επιτρέπει να κατανοούμε τις ανάγκες σας και να παρέχουμε λύσεις που κάνουν τη διαφορά.',
    'about.whyWork.experience.title': 'Εμπειρία',
    'about.whyWork.experience.desc': 'Πάνω από 30 χρόνια τεχνογνωσίας στην παραγωγή συσκευασιών.',
    'about.whyWork.reliability.title': 'Αξιοπιστία',
    'about.whyWork.reliability.desc': 'Έγκαιρη παράδοση και σταθερή ποιότητα σε κάθε παραγγελία.',
    'about.whyWork.cooperation.title': 'Μακροχρόνια Συνεργασία',
    'about.whyWork.cooperation.desc': 'Χτίζουμε σχέσεις εμπιστοσύνης με τους πελάτες μας.',
    'about.whyWork.consistency.title': 'Συνέπεια Παραγωγής',
    'about.whyWork.consistency.desc': 'Ίδια υψηλή ποιότητα σε κάθε παρτίδα προϊόντων.',
    'about.cta.button': 'Επικοινωνήστε Μαζί μας',
    
    // Products Page
    'products.page.title': 'Προϊόντα',
    'products.page.subtitle': 'Ανακαλύψτε τη γκάμα των προϊόντων μας',
    'products.page.heroTitle': 'Ανακαλύψτε τη γκάμα των προϊόντων μας',
    'products.plastic.full.title': 'Πλαστικές Σακούλες',
    'products.plastic.full.desc': 'Ευρεία γκάμα πλαστικών σακουλών για λιανεμπόριο, σούπερ μάρκετ και βιομηχανική χρήση. Διαθέσιμες σε διάφορα μεγέθη, χρώματα και πάχη.',
    'products.paper.full.title': 'Χάρτινες Σακούλες',
    'products.paper.full.desc': 'Ιδανικές για καταστήματα, εστιατόρια και επιχειρήσεις που δίνουν έμφαση στην ποιότητα και την επαγγελματική παρουσία. Διατίθενται με επιλογές φινιρίσματος και δυνατότητα εκτύπωσης λογοτύπου, προσφέροντας ολοκληρωμένες λύσεις συσκευασίας.',
    'products.custom.full.title': 'Εξατομικευμένες Λύσεις',
    'products.custom.full.desc': 'Σχεδιάζουμε και κατασκευάζουμε σακούλες με το λογότυπο και τα χρώματα της επιχείρησής σας. Πλήρης εκτύπωση και branding.',
    'products.features': 'Χαρακτηριστικά',
    'products.request': 'Ζητήστε Προσφορά',
    'products.viewMore': 'Δείτε Περισσότερα',
    
    // Contact Page
    'contact.title': 'Επικοινωνία',
    'contact.subtitle': 'Είμαστε εδώ για να βοηθήσουμε. Επικοινωνήστε μαζί μας σήμερα.',
    'contact.form.name': 'Ονοματεπώνυμο',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Τηλέφωνο',
    'contact.form.company': 'Επιχείρηση',
    'contact.form.message': 'Μήνυμα',
    'contact.form.submit': 'Αποστολή',
    'contact.info.title': 'Στοιχεία Επικοινωνίας',
    'contact.info.address': 'Διεύθυνση',
    'contact.info.phone': 'Τηλέφωνο',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Ωράριο',
    'contact.info.hours.value': 'Δευτέρα - Παρασκευή: 08:00 - 17:00',
    
    // Footer
    'footer.rights': 'Με επιφύλαξη παντός δικαιώματος',
    'footer.description': 'Κατασκευή πλαστικών και χάρτινων σακουλών για επιχειρήσεις',
    
    // CTA
    'cta.title': 'Έτοιμοι να συνεργαστούμε;',
    'cta.subtitle': 'Επικοινωνήστε μαζί μας για να συζητήσουμε τις ανάγκες σας',
    'cta.button': 'Ξεκινήστε Τώρα',

    // Trusted By
    'trustedBy.title': 'Ποιοι μας Εμπιστεύονται',

    // Stats Section
    'stats.years': 'Χρόνια Εμπειρίας',
    'stats.clients': 'Πελάτες',
    'stats.bags': 'Σακούλες/Μήνα',
    'stats.satisfaction': 'Ικανοποίηση',

    // About Preview Section
    'aboutPreview.title': '30 Χρόνια Εμπειρίας & Ποιότητας',
    'aboutPreview.text': 'Με περισσότερα από 30 χρόνια εμπειρίας, η Laderos Bags δραστηριοποιείται δυναμικά στον χώρο της παραγωγής χάρτινων και πλαστικών σακουλών. Επενδύουμε διαχρονικά στην ποιότητα, τη συνέπεια και τις σύγχρονες μεθόδους παραγωγής, προσφέροντας αξιόπιστες λύσεις συσκευασίας για κάθε επιχείρηση.',
    'aboutPreview.button': 'Μάθετε Περισσότερα',

    // Where to Find Us Section
    'whereToFindUs.title': 'Πού Βρισκόμαστε',
    'whereToFindUs.text': 'Θα μας βρείτε στις εγκαταστάσεις μας στην Ελασσώνος 13, Αχαρνές 136 72. Είμαστε στη διάθεσή σας Δευτέρα έως Παρασκευή, από 8:00 π.μ. έως 5:00 μ.μ., για οποιαδήποτε πληροφορία ή συνεργασία.',
    'whereToFindUs.button': 'Επικοινωνήστε μαζί μας',

    // Paper Bags Page
    'paperBags.backToProducts': 'Πίσω στα Προϊόντα',
    'paperBags.title': 'Χάρτινες Σακούλες',
    'paperBags.subtitle': 'Οικολογικές χάρτινες σακούλες υψηλής ποιότητας για επιχειρήσεις που ενδιαφέρονται για το περιβάλλον και την αισθητική.',
    'paperBags.sectionTitle': 'Κομψότητα & Βιωσιμότητα',
    'paperBags.description1': 'Οι χάρτινες σακούλες μας κατασκευάζονται από υψηλής ποιότητας χαρτί, προσφέροντας μια κομψή και οικολογική λύση συσκευασίας για την επιχείρησή σας. Κάθε σακούλα σχεδιάζεται με γνώμονα την αντοχή και την αισθητική.',
    'paperBags.description2': 'Από μικρές σακούλες για κοσμηματοπωλεία έως μεγάλες τσάντες για καταστήματα ρούχων, προσφέρουμε εξατομικευμένες λύσεις με πλήρη εκτύπωση του λογοτύπου και των χρωμάτων σας.',
    'paperBags.featuresTitle': 'Χαρακτηριστικά Προϊόντων',
    'paperBags.feature1': 'Ανακυκλώσιμο και βιοδιασπώμενο υλικό',
    'paperBags.feature2': 'Πλήρης εκτύπωση με το λογότυπό σας',
    'paperBags.feature3': 'Διαθέσιμα σε πολλά μεγέθη και σχήματα',
    'paperBags.feature4': 'Επιλογή λαβών: κορδόνι, ριμπόν, χάρτινες',
    'paperBags.feature5': 'Υψηλή αντοχή και ελάχιστη ελαστικότητα',
    'paperBags.feature6': 'Ματ ή γυαλιστερό φινίρισμα',
    'paperBags.cta': 'Ζητήστε Προσφορά',
    'paperBags.applicationsTitle': 'Ιδανικές για Κάθε Κλάδο',
    'paperBags.applicationsText': 'Οι χάρτινες σακούλες μας εξυπηρετούν επιχειρήσεις από διάφορους κλάδους, προσφέροντας επαγγελματική εικόνα και περιβαλλοντική υπευθυνότητα.',
    'paperBags.industries': 'Λιανεμπόριο, Κοσμήματα, Ρούχα, Εστιατόρια, Ξενοδοχεία, Φαρμακεία',

    // Quote Request Form
    'quoteForm.title': 'Ζητήστε Προσφορά',
    'quoteForm.subtitle': 'Επιλέξτε τις προδιαγραφές που σας ενδιαφέρουν',
    'quoteForm.bagType': 'Τύπος Σακούλας',
    'quoteForm.size': 'Μέγεθος',
    'quoteForm.customSize': 'Προσαρμοσμένο',
    'quoteForm.customSizeHint': 'Εισάγετε τις διαστάσεις της σακούλας σας:',
    'quoteForm.height': 'Ύψος',
    'quoteForm.width': 'Πλάτος',
    'quoteForm.gusset': 'Πάτος',
    'quoteForm.handles': 'Λαβές',
    'quoteForm.finishing': 'Φινίρισμα',
    'quoteForm.printing': 'Εκτύπωση',
    'quoteForm.extraProcessing': 'Επιπλέον Επεξεργασία',
    'quoteForm.submit': 'Υποβολή',
    'quoteForm.modal.title': 'Αίτημα Προσφοράς',
    'quoteForm.modal.fullName': 'Ονοματεπώνυμο',
    'quoteForm.modal.email': 'E-Mail',
    'quoteForm.modal.phone': 'Τηλέφωνο Επικοινωνίας',
    'quoteForm.modal.message': 'Μήνυμα',
    'quoteForm.modal.submit': 'Λάβετε Προσφορά',
    'quoteForm.modal.modify': 'Τροποποίηση',

    // Plastic Bags Page
    'plasticBags.backToProducts': 'Πίσω στα Προϊόντα',
    'plasticBags.title': 'Πλαστικές Σακούλες',
    'plasticBags.subtitle': 'Ανθεκτικές πλαστικές σακούλες για επαγγελματική χρήση, με δυνατότητα πλήρους εξατομίκευσης.',
    'plasticBags.sectionTitle': 'Αντοχή & Ευελιξία',
    'plasticBags.description1': 'Οι πλαστικές σακούλες μας είναι σχεδιασμένες για μέγιστη αντοχή και ευελιξία. Κατασκευάζονται με υψηλής ποιότητας υλικά που εξασφαλίζουν ανθεκτικότητα ακόμα και υπό βαριά χρήση.',
    'plasticBags.description2': 'Προσφέρουμε μια ευρεία γκάμα πλαστικών σακουλών για σούπερ μάρκετ, λιανεμπόριο και βιομηχανική χρήση, με δυνατότητα εκτύπωσης και branding.',
    'plasticBags.featuresTitle': 'Χαρακτηριστικά Προϊόντων',
    'plasticBags.feature1': 'Υψηλή αντοχή σε βάρος και τάση',
    'plasticBags.feature2': 'Εκτύπωση έως 8 χρώματα',
    'plasticBags.feature3': 'Διαθέσιμα σε όλα τα μεγέθη',
    'plasticBags.feature4': 'Επιλογή λαβών: κοπτές, loop, flexiloop',
    'plasticBags.feature5': 'Διάφορα πάχη πολυαιθυλενίου',
    'plasticBags.feature6': 'Διάφανες ή αδιαφανείς επιλογές',
    'plasticBags.cta': 'Ζητήστε Προσφορά',
    'plasticBags.applicationsTitle': 'Εφαρμογές για Κάθε Επιχείρηση',
    'plasticBags.applicationsText': 'Οι πλαστικές σακούλες μας εξυπηρετούν μια μεγάλη ποικιλία επιχειρήσεων, από μικρά καταστήματα έως μεγάλες αλυσίδες.',
    'plasticBags.industries': 'Σούπερ Μάρκετ, Λιανεμπόριο, Βιομηχανία, Logistics, Φαρμακεία, Καταστήματα',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Professional Packaging Solutions',
    'hero.subtitle': 'We manufacture high-quality plastic and paper bags for businesses across Greece',
    'hero.cta.products': 'Our Products',
    'hero.cta.contact': 'Contact Us',
    
    // Features
    'features.title': 'Why Choose Us',
    'features.quality.title': 'High Quality',
    'features.quality.desc': 'We use premium materials for durable products',
    'features.custom.title': 'Custom Solutions',
    'features.custom.desc': 'We adapt to your business needs',
    'features.reliable.title': 'Reliability',
    'features.reliable.desc': 'Timely delivery and consistent service',
    'features.eco.title': 'Eco-Friendly',
    'features.eco.desc': 'Ecological options and sustainable practices',
    
    // Products Preview
    'products.title': 'Our Products',
    'products.subtitle': 'Complete packaging solutions for every business need',
    'products.section.title': 'Paper & Plastic Bags Made to Your Measurements',
    'products.section.text1': 'At Laderos Bags, we view packaging as a powerful way to express your brand identity. We manufacture high-quality paper and plastic bags, fully customized to meet your business needs.',
    'products.section.text2': 'From durable plastic bags to elegant paper solutions, we provide tailor-made production that combines functionality, aesthetics, and professional presentation. We create packaging solutions that stand out and elevate your brand.',
    'products.plastic.title': 'Plastic Bags',
    'products.plastic.desc': 'Durable plastic bags in various sizes and designs',
    'products.paper.title': 'Paper Bags',
    'products.paper.desc': 'Eco-friendly paper bags with high durability',
    'products.custom.title': 'Custom Solutions',
    'products.custom.desc': 'Personalized packaging with your logo',
    'products.viewall': 'View All Products',
    'products.explore': 'Explore',
    
    // About Page
    'about.hero.title': '30 YEARS IN BAG MANUFACTURING',
    'about.hero.subtitle': 'Experience, quality, and reliability in packaging production',
    'about.videoPlaceholder': 'Video coming soon',
    'about.whoWeAre.title': 'Who We Are',
    'about.whoWeAre.text': 'Laderos Bags has been operating for over 30 years in the production of paper and plastic bags. With modern machinery and experienced staff, we deliver reliable packaging solutions for businesses across Greece.',
    'about.whatWeDo.title': 'What We Do',
    'about.services.customManufacturing.title': 'Custom Bag Manufacturing',
    'about.services.customManufacturing.desc': 'We manufacture bags according to your exact specifications.',
    'about.services.paperPlastic.title': 'Paper & Plastic Solutions',
    'about.services.paperPlastic.desc': 'Full range of materials and designs for every need.',
    'about.services.qualityConsistency.title': 'Quality & Consistency',
    'about.services.qualityConsistency.desc': 'We ensure high standards in every order.',
    'about.services.b2bPartnerships.title': 'B2B Partnerships',
    'about.services.b2bPartnerships.desc': 'Long-term relationships built on trust with businesses.',
    'about.production.title': 'Our Production',
    'about.production.text': 'Modern facilities and state-of-the-art machinery for efficient and quality production.',
    'about.whyWork.title': 'Why Work With Us',
    'about.whyWork.text': 'Our 30 years of experience allows us to understand your needs and provide solutions that make a difference.',
    'about.whyWork.experience.title': 'Experience',
    'about.whyWork.experience.desc': 'Over 30 years of expertise in packaging production.',
    'about.whyWork.reliability.title': 'Reliability',
    'about.whyWork.reliability.desc': 'Timely delivery and consistent quality in every order.',
    'about.whyWork.cooperation.title': 'Long-term Cooperation',
    'about.whyWork.cooperation.desc': 'We build trusted relationships with our clients.',
    'about.whyWork.consistency.title': 'Production Consistency',
    'about.whyWork.consistency.desc': 'Same high quality in every batch of products.',
    'about.cta.button': 'Contact Us',
    
    // Products Page
    'products.page.title': 'Products',
    'products.page.subtitle': 'Discover our product range',
    'products.page.heroTitle': 'Discover Our Product Range',
    'products.plastic.full.title': 'Plastic Bags',
    'products.plastic.full.desc': 'Wide range of plastic bags for retail, supermarkets, and industrial use. Available in various sizes, colors, and thicknesses.',
    'products.paper.full.title': 'Paper Bags',
    'products.paper.full.desc': 'Ideal for shops, restaurants, and businesses that prioritize quality and professional presentation. Available with finishing options and logo printing capabilities, providing complete packaging solutions.',
    'products.custom.full.title': 'Custom Solutions',
    'products.custom.full.desc': 'We design and manufacture bags with your logo and business colors. Full printing and branding services.',
    'products.features': 'Features',
    'products.request': 'Request Quote',
    'products.viewMore': 'View More',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': "We're here to help. Contact us today.",
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.company': 'Company',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Working Hours',
    'contact.info.hours.value': 'Monday - Friday: 08:00 - 17:00',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.description': 'Manufacturing plastic and paper bags for businesses',
    
    // CTA
    'cta.title': 'Ready to Partner?',
    'cta.subtitle': 'Contact us to discuss your needs',
    'cta.button': 'Get Started',

    // Trusted By
    'trustedBy.title': 'Who Trusts Us',

    // Stats Section
    'stats.years': 'Years of Experience',
    'stats.clients': 'Clients',
    'stats.bags': 'Bags/Month',
    'stats.satisfaction': 'Satisfaction',

    // About Preview Section
    'aboutPreview.title': '30 Years of Experience & Quality',
    'aboutPreview.text': 'With over 30 years of experience, Laderos Bags has been actively operating in the production of paper and plastic bags. We consistently invest in quality, reliability, and modern manufacturing methods, delivering trusted packaging solutions for businesses.',
    'aboutPreview.button': 'Learn More',

    // Where to Find Us Section
    'whereToFindUs.title': 'Where to Find Us',
    'whereToFindUs.text': 'You can find us at our facilities at Elassonos 13, Acharnes 136 72, Greece. We are available Monday to Friday, from 8:00 AM to 5:00 PM, for any information or collaboration.',
    'whereToFindUs.button': 'Contact Us',

    // Paper Bags Page
    'paperBags.backToProducts': 'Back to Products',
    'paperBags.title': 'Paper Bags',
    'paperBags.subtitle': 'High-quality eco-friendly paper bags for businesses that care about the environment and aesthetics.',
    'paperBags.sectionTitle': 'Elegance & Sustainability',
    'paperBags.description1': 'Our paper bags are manufactured from premium quality paper, offering an elegant and eco-friendly packaging solution for your business. Each bag is designed with durability and aesthetics in mind.',
    'paperBags.description2': 'From small bags for jewelry stores to large shopping bags for clothing retailers, we offer customized solutions with full printing of your logo and brand colors.',
    'paperBags.featuresTitle': 'Product Features',
    'paperBags.feature1': 'Recyclable and biodegradable material',
    'paperBags.feature2': 'Full custom printing with your logo',
    'paperBags.feature3': 'Available in many sizes and shapes',
    'paperBags.feature4': 'Handle options: rope, ribbon, paper',
    'paperBags.feature5': 'High strength with minimal stretch',
    'paperBags.feature6': 'Matte or glossy finish options',
    'paperBags.cta': 'Request a Quote',
    'paperBags.applicationsTitle': 'Perfect for Every Industry',
    'paperBags.applicationsText': 'Our paper bags serve businesses across various industries, offering professional image and environmental responsibility.',
    'paperBags.industries': 'Retail, Jewelry, Clothing, Restaurants, Hotels, Pharmacies',

    // Quote Request Form
    'quoteForm.title': 'Request a Quote',
    'quoteForm.subtitle': 'Select the specifications that interest you',
    'quoteForm.bagType': 'Bag Type',
    'quoteForm.size': 'Size',
    'quoteForm.customSize': 'Custom',
    'quoteForm.customSizeHint': 'Enter your bag dimensions:',
    'quoteForm.height': 'Height',
    'quoteForm.width': 'Width',
    'quoteForm.gusset': 'Gusset',
    'quoteForm.handles': 'Handles',
    'quoteForm.finishing': 'Finishing',
    'quoteForm.printing': 'Printing',
    'quoteForm.extraProcessing': 'Extra Processing',
    'quoteForm.submit': 'Submit',
    'quoteForm.modal.title': 'Quote Request',
    'quoteForm.modal.fullName': 'Full Name',
    'quoteForm.modal.email': 'E-Mail',
    'quoteForm.modal.phone': 'Contact Phone',
    'quoteForm.modal.message': 'Message',
    'quoteForm.modal.submit': 'Get Quote',
    'quoteForm.modal.modify': 'Modify',

    // Plastic Bags Page
    'plasticBags.backToProducts': 'Back to Products',
    'plasticBags.title': 'Plastic Bags',
    'plasticBags.subtitle': 'Durable plastic bags for professional use, with full customization capabilities.',
    'plasticBags.sectionTitle': 'Strength & Flexibility',
    'plasticBags.description1': 'Our plastic bags are designed for maximum strength and flexibility. They are manufactured with high-quality materials that ensure durability even under heavy use.',
    'plasticBags.description2': 'We offer a wide range of plastic bags for supermarkets, retail, and industrial use, with printing and branding capabilities.',
    'plasticBags.featuresTitle': 'Product Features',
    'plasticBags.feature1': 'High weight and tension resistance',
    'plasticBags.feature2': 'Printing up to 8 colors',
    'plasticBags.feature3': 'Available in all sizes',
    'plasticBags.feature4': 'Handle options: die-cut, loop, flexiloop',
    'plasticBags.feature5': 'Various polyethylene thicknesses',
    'plasticBags.feature6': 'Transparent or opaque options',
    'plasticBags.cta': 'Request a Quote',
    'plasticBags.applicationsTitle': 'Applications for Every Business',
    'plasticBags.applicationsText': 'Our plastic bags serve a wide variety of businesses, from small shops to large retail chains.',
    'plasticBags.industries': 'Supermarkets, Retail, Industry, Logistics, Pharmacies, Stores',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('el');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  // In rare cases (e.g. hot reload/refresh timing), components can briefly render
  // before providers are fully re-mounted. Avoid a full blank-screen crash.
  if (!context) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn('useLanguage called outside LanguageProvider; using safe defaults.');
    }

    const fallbackLanguage: Language = 'el';
    return {
      language: fallbackLanguage,
      setLanguage: () => {
        /* no-op */
      },
      t: (key: string) => translations[fallbackLanguage][key] || key,
    };
  }

  return context;
};
