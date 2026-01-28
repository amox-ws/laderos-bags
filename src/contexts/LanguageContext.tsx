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
    'about.title': 'Η Εταιρεία μας',
    'about.subtitle': 'Πάνω από 20 χρόνια εμπειρίας στην κατασκευή συσκευασιών',
    'about.story.title': 'Η Ιστορία μας',
    'about.story.text': 'Η Laderos Bags ξεκίνησε τη λειτουργία της με όραμα να παρέχει υψηλής ποιότητας λύσεις συσκευασίας στην ελληνική αγορά. Με τα χρόνια, εξελιχθήκαμε σε έναν αξιόπιστο συνεργάτη για επιχειρήσεις κάθε μεγέθους.',
    'about.mission.title': 'Αποστολή',
    'about.mission.text': 'Να παρέχουμε καινοτόμες και βιώσιμες λύσεις συσκευασίας που ενισχύουν την εικόνα της επιχείρησής σας και προστατεύουν τα προϊόντα σας.',
    'about.values.title': 'Αξίες',
    'about.values.quality': 'Ποιότητα',
    'about.values.reliability': 'Αξιοπιστία',
    'about.values.innovation': 'Καινοτομία',
    'about.values.sustainability': 'Βιωσιμότητα',
    
    // Products Page
    'products.page.title': 'Προϊόντα',
    'products.page.subtitle': 'Ανακαλύψτε τη γκάμα των προϊόντων μας',
    'products.plastic.full.title': 'Πλαστικές Σακούλες',
    'products.plastic.full.desc': 'Ευρεία γκάμα πλαστικών σακουλών για λιανεμπόριο, σούπερ μάρκετ και βιομηχανική χρήση. Διαθέσιμες σε διάφορα μεγέθη, χρώματα και πάχη.',
    'products.paper.full.title': 'Χάρτινες Σακούλες',
    'products.paper.full.desc': 'Οικολογικές χάρτινες σακούλες από ανακυκλωμένα υλικά. Ιδανικές για καταστήματα, εστιατόρια και επιχειρήσεις που ενδιαφέρονται για το περιβάλλον.',
    'products.custom.full.title': 'Εξατομικευμένες Λύσεις',
    'products.custom.full.desc': 'Σχεδιάζουμε και κατασκευάζουμε σακούλες με το λογότυπο και τα χρώματα της επιχείρησής σας. Πλήρης εκτύπωση και branding.',
    'products.features': 'Χαρακτηριστικά',
    'products.request': 'Ζητήστε Προσφορά',
    
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
    'about.title': 'About Us',
    'about.subtitle': 'Over 20 years of experience in packaging manufacturing',
    'about.story.title': 'Our Story',
    'about.story.text': 'Laderos Bags started with a vision to provide high-quality packaging solutions to the Greek market. Over the years, we have evolved into a trusted partner for businesses of all sizes.',
    'about.mission.title': 'Mission',
    'about.mission.text': 'To provide innovative and sustainable packaging solutions that enhance your business image and protect your products.',
    'about.values.title': 'Values',
    'about.values.quality': 'Quality',
    'about.values.reliability': 'Reliability',
    'about.values.innovation': 'Innovation',
    'about.values.sustainability': 'Sustainability',
    
    // Products Page
    'products.page.title': 'Products',
    'products.page.subtitle': 'Discover our product range',
    'products.plastic.full.title': 'Plastic Bags',
    'products.plastic.full.desc': 'Wide range of plastic bags for retail, supermarkets, and industrial use. Available in various sizes, colors, and thicknesses.',
    'products.paper.full.title': 'Paper Bags',
    'products.paper.full.desc': 'Eco-friendly paper bags made from recycled materials. Ideal for shops, restaurants, and environmentally conscious businesses.',
    'products.custom.full.title': 'Custom Solutions',
    'products.custom.full.desc': 'We design and manufacture bags with your logo and business colors. Full printing and branding services.',
    'products.features': 'Features',
    'products.request': 'Request Quote',
    
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
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
