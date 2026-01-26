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
