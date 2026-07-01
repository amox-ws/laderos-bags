import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicyPage = () => {
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <Layout>
      <SEO routeKey="/privacy-policy" />
      <section className="py-20 md:py-28 main-section">
        <div className="container-page max-w-3xl">
          <span className="section-label">{isGreek ? 'Νομικά' : 'Legal'}</span>
          <h1 className="text-4xl md:text-6xl text-foreground mb-4">
            {isGreek ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}
          </h1>
          <p className="text-muted-foreground mb-12 text-sm">
            {isGreek ? 'Τελευταία ενημέρωση: Μάρτιος 2026' : 'Last updated: March 2026'}
          </p>

          <div className="space-y-8 text-foreground/90 leading-relaxed">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {isGreek ? '1. Εισαγωγή' : '1. Introduction'}
              </h2>
              <p>
                {isGreek
                  ? 'Η Laderos Bags (εφεξής "εμείς" ή "η Εταιρεία") σέβεται το απόρρητό σας και δεσμεύεται να προστατεύει τα προσωπικά σας δεδομένα σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR) της ΕΕ και την ελληνική νομοθεσία. Η παρούσα πολιτική εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα δεδομένα σας όταν επισκέπτεστε τον ιστότοπό μας.'
                  : 'Laderos Bags (hereinafter "we" or "the Company") respects your privacy and is committed to protecting your personal data in accordance with the EU General Data Protection Regulation (GDPR) and Greek legislation. This policy explains how we collect, use, and protect your data when you visit our website.'}
              </p>
            </div>

            {/* Data We Collect */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {isGreek ? '2. Δεδομένα που Συλλέγουμε' : '2. Data We Collect'}
              </h2>
              <p className="mb-3">
                {isGreek
                  ? 'Συλλέγουμε προσωπικά δεδομένα μόνο όταν εσείς τα παρέχετε οικειοθελώς μέσω των φορμών επικοινωνίας και αιτημάτων προσφοράς στον ιστότοπό μας. Αυτά περιλαμβάνουν:'
                  : 'We collect personal data only when you voluntarily provide it through the contact and quote request forms on our website. This includes:'}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{isGreek ? 'Ονοματεπώνυμο' : 'Full name'}</li>
                <li>{isGreek ? 'Διεύθυνση email' : 'Email address'}</li>
                <li>{isGreek ? 'Αριθμός τηλεφώνου' : 'Phone number'}</li>
                <li>{isGreek ? 'Επωνυμία εταιρείας (προαιρετικά)' : 'Company name (optional)'}</li>
                <li>{isGreek ? 'Μήνυμα / σχόλια' : 'Message / comments'}</li>
                <li>{isGreek ? 'Προδιαγραφές προϊόντων (τύπος σακούλας, μέγεθος, φινίρισμα κ.λπ.)' : 'Product specifications (bag type, size, finishing, etc.)'}</li>
              </ul>
            </div>

            {/* Purpose of Data Processing */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {isGreek ? '3. Σκοπός Επεξεργασίας' : '3. Purpose of Data Processing'}
              </h2>
              <p className="mb-3">
                {isGreek
                  ? 'Χρησιμοποιούμε τα δεδομένα σας αποκλειστικά για τους ακόλουθους σκοπούς:'
                  : 'We use your data exclusively for the following purposes:'}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{isGreek ? 'Να απαντήσουμε στα αιτήματα επικοινωνίας σας' : 'To respond to your contact inquiries'}</li>
                <li>{isGreek ? 'Να επεξεργαστούμε τα αιτήματα προσφοράς σας' : 'To process your quote requests'}</li>
                <li>{isGreek ? 'Να επικοινωνήσουμε μαζί σας σχετικά με τα προϊόντα και τις υπηρεσίες μας' : 'To communicate with you about our products and services'}</li>
              </ul>
            </div>

            {/* Legal Basis */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {isGreek ? '4. Νομική Βάση' : '4. Legal Basis'}
              </h2>
              <p>
                {isGreek
                  ? 'Η νομική βάση για την επεξεργασία των δεδομένων σας είναι η συγκατάθεσή σας (Άρθρο 6(1)(α) GDPR), την οποία παρέχετε υποβάλλοντας τη φόρμα επικοινωνίας ή αιτήματος προσφοράς, καθώς και το έννομο συμφέρον μας (Άρθρο 6(1)(στ) GDPR) να ανταποκρινόμαστε σε εμπορικές ερωτήσεις.'
                  : 'The legal basis for processing your data is your consent (Article 6(1)(a) GDPR), which you provide by submitting a contact or quote request form, as well as our legitimate interest (Article 6(1)(f) GDPR) to respond to commercial inquiries.'}
              </p>
            </div>

            {/* Data Storage */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {isGreek ? '5. Αποθήκευση Δεδομένων' : '5. Data Storage'}
              </h2>
              <p>
                {isGreek
                  ? 'Τα δεδομένα που υποβάλλονται μέσω των φορμών μας αποστέλλονται μέσω της υπηρεσίας Formspree και παραλαμβάνονται μέσω email. Δεν αποθηκεύουμε τα δεδομένα σας σε βάση δεδομένων. Τα δεδομένα διατηρούνται μόνο για τον χρόνο που απαιτείται για την ολοκλήρωση του αιτήματός σας.'
                  : 'Data submitted through our forms is sent via the Formspree service and received via email. We do not store your data in a database. Data is retained only for the time necessary to fulfill your request.'}
              </p>
            </div>

            {/* Third Parties */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {isGreek ? '6. Τρίτα Μέρη' : '6. Third Parties'}
              </h2>
              <p className="mb-3">
                {isGreek
                  ? 'Δεν πωλούμε, ενοικιάζουμε ή μοιραζόμαστε τα προσωπικά σας δεδομένα με τρίτους για διαφημιστικούς σκοπούς. Χρησιμοποιούμε τις ακόλουθες υπηρεσίες τρίτων:'
                  : 'We do not sell, rent, or share your personal data with third parties for marketing purposes. We use the following third-party services:'}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Formspree</strong> – {isGreek
                    ? 'Χρησιμοποιείται ως μεσολαβητής για τη μεταφορά των δεδομένων φόρμας στο email μας.'
                    : 'Used as an intermediary to transfer form data to our email.'}{' '}
                  <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80">
                    {isGreek ? 'Πολιτική Απορρήτου Formspree' : 'Formspree Privacy Policy'}
                  </a>
                </li>
                <li>
                  <strong>Google Maps</strong> – {isGreek
                    ? 'Χρησιμοποιείται για την εμφάνιση χαρτών στον ιστότοπό μας. Η φόρτωση του χάρτη απαιτεί τη συγκατάθεσή σας καθώς τοποθετεί cookies τρίτων.'
                    : 'Used to display maps on our website. Loading the map requires your consent as it sets third-party cookies.'}{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80">
                    {isGreek ? 'Πολιτική Απορρήτου Google' : 'Google Privacy Policy'}
                  </a>
                </li>
                <li>
                  <strong>Vercel Analytics</strong> – {isGreek
                    ? 'Χρησιμοποιείται για την ανάλυση της επισκεψιμότητας του ιστότοπου με τρόπο που σέβεται το απόρρητο, χωρίς να συλλέγει προσωπικά δεδομένα.'
                    : 'Used for privacy-friendly website traffic analysis without collecting personal data.'}{' '}
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80">
                    {isGreek ? 'Πολιτική Απορρήτου Vercel' : 'Vercel Privacy Policy'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {isGreek ? '7. Τα Δικαιώματά σας' : '7. Your Rights'}
              </h2>
              <p className="mb-3">
                {isGreek
                  ? 'Σύμφωνα με τον GDPR, έχετε τα ακόλουθα δικαιώματα:'
                  : 'Under the GDPR, you have the following rights:'}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{isGreek ? 'Δικαίωμα πρόσβασης στα δεδομένα σας' : 'Right to access your data'}</li>
                <li>{isGreek ? 'Δικαίωμα διόρθωσης ανακριβών δεδομένων' : 'Right to rectify inaccurate data'}</li>
                <li>{isGreek ? 'Δικαίωμα διαγραφής ("δικαίωμα στη λήθη")' : 'Right to erasure ("right to be forgotten")'}</li>
                <li>{isGreek ? 'Δικαίωμα περιορισμού της επεξεργασίας' : 'Right to restrict processing'}</li>
                <li>{isGreek ? 'Δικαίωμα φορητότητας δεδομένων' : 'Right to data portability'}</li>
                <li>{isGreek ? 'Δικαίωμα εναντίωσης στην επεξεργασία' : 'Right to object to processing'}</li>
                <li>{isGreek ? 'Δικαίωμα ανάκλησης συγκατάθεσης ανά πάσα στιγμή' : 'Right to withdraw consent at any time'}</li>
              </ul>
              <p className="mt-3">
                {isGreek
                  ? 'Για την άσκηση οποιουδήποτε δικαιώματος, επικοινωνήστε μαζί μας στο laderosbags@gmail.com.'
                  : 'To exercise any of these rights, contact us at laderosbags@gmail.com.'}
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {isGreek ? '8. Cookies & Αναλυτικά Στοιχεία' : '8. Cookies & Analytics'}
              </h2>
              <p className="mb-3">
                {isGreek
                  ? 'Ο ιστότοπός μας χρησιμοποιεί Vercel Analytics για τη βελτίωση της εμπειρίας του χρήστη. Αυτό το εργαλείο είναι σχεδιασμένο να προστατεύει το απόρρητό σας και δεν συλλέγει προσωπικά αναγνωρίσιμα στοιχεία. Επιπλέον, χρησιμοποιούμε ενσωματωμένους χάρτες Google Maps, οι οποίοι τοποθετούν cookies τρίτων (π.χ. NID, CONSENT) για λόγους λειτουργίας.'
                  : 'Our website uses Vercel Analytics to improve the user experience. This tool is designed to protect your privacy and does not collect personally identifiable information. Additionally, we use embedded Google Maps, which set third-party cookies (e.g., NID, CONSENT) for functionality purposes.'}
              </p>
              <p>
                {isGreek
                  ? 'Τα cookies και τα εργαλεία ανάλυσης ενεργοποιούνται μόνο μετά τη ρητή συγκατάθεσή σας μέσω του banner cookies. Μπορείτε να αποδεχτείτε ή να απορρίψετε τη χρήση τους ανά πάσα στιγμή.'
                  : 'Cookies and analytics tools are activated only after your explicit consent via the cookie banner. You can accept or decline their use at any time.'}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {isGreek ? '9. Επικοινωνία' : '9. Contact'}
              </h2>
              <p className="mb-2">
                {isGreek
                  ? 'Για ερωτήσεις σχετικά με την πολιτική απορρήτου ή τα δεδομένα σας, επικοινωνήστε μαζί μας:'
                  : 'For questions about this privacy policy or your data, contact us:'}
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                <p><strong>Laderos Bags</strong></p>
                <p>Ελασσώνος 13, Αχαρνές 136 72</p>
                <p>Email: laderosbags@gmail.com</p>
                <p>{isGreek ? 'Τηλ' : 'Tel'}: 697 266 1870 · 210 244 3550 · 210 244 3800</p>
              </div>
            </div>

            {/* Supervisory Authority */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {isGreek ? '10. Εποπτική Αρχή' : '10. Supervisory Authority'}
              </h2>
              <p>
                {isGreek
                  ? 'Εάν θεωρείτε ότι η επεξεργασία των προσωπικών σας δεδομένων παραβιάζει τον GDPR, έχετε το δικαίωμα να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (www.dpa.gr).'
                  : 'If you believe that the processing of your personal data violates the GDPR, you have the right to lodge a complaint with the Hellenic Data Protection Authority (www.dpa.gr).'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicyPage;
