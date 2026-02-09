import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const TermsOfServicePage = () => {
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container-page max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {isGreek ? 'Όροι Χρήσης' : 'Terms of Service'}
          </h1>
          <p className="text-muted-foreground mb-8 text-sm">
            {isGreek ? 'Τελευταία ενημέρωση: Φεβρουάριος 2026' : 'Last updated: February 2026'}
          </p>

          <div className="space-y-8 text-foreground/90 leading-relaxed">
            {/* 1. Introduction */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isGreek ? '1. Εισαγωγή' : '1. Introduction'}
              </h2>
              <p>
                {isGreek
                  ? 'Καλωσορίσατε στον ιστότοπο της Laderos Bags. Χρησιμοποιώντας αυτόν τον ιστότοπο, αποδέχεστε τους παρόντες όρους χρήσης. Εάν δεν συμφωνείτε, παρακαλούμε μην χρησιμοποιείτε τον ιστότοπο.'
                  : 'Welcome to the Laderos Bags website. By using this website, you accept these terms of service. If you do not agree, please do not use the website.'}
              </p>
            </div>

            {/* 2. Services */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isGreek ? '2. Υπηρεσίες' : '2. Services'}
              </h2>
              <p>
                {isGreek
                  ? 'Η Laderos Bags ειδικεύεται στην κατασκευή χάρτινων και πλαστικών σακουλών κατά παραγγελία. Ο ιστότοπος παρέχει πληροφορίες για τα προϊόντα μας και δίνει τη δυνατότητα υποβολής αιτημάτων προσφοράς.'
                  : 'Laderos Bags specializes in the manufacturing of custom paper and plastic bags. This website provides information about our products and allows you to submit quote requests.'}
              </p>
            </div>

            {/* 3. Quote Disclaimers */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isGreek ? '3. Αιτήματα Προσφοράς' : '3. Quote Requests'}
              </h2>
              <p className="mb-3">
                {isGreek
                  ? 'Η υποβολή αιτήματος προσφοράς μέσω του ιστοτόπου μας δεν αποτελεί δεσμευτική παραγγελία ούτε σύμβαση αγοράς. Ειδικότερα:'
                  : 'Submitting a quote request through our website does not constitute a binding order or purchase agreement. Specifically:'}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  {isGreek
                    ? 'Οι τιμές και οι προδιαγραφές που αναφέρονται στον ιστότοπο είναι ενδεικτικές και μπορεί να διαφέρουν στην τελική προσφορά.'
                    : 'Prices and specifications shown on the website are indicative and may differ in the final quote.'}
                </li>
                <li>
                  {isGreek
                    ? 'Η τελική τιμή εξαρτάται από τις ακριβείς προδιαγραφές, την ποσότητα και τις τρέχουσες τιμές πρώτων υλών.'
                    : 'The final price depends on exact specifications, quantity, and current raw material costs.'}
                </li>
                <li>
                  {isGreek
                    ? 'Μια παραγγελία θεωρείται επιβεβαιωμένη μόνο μετά από γραπτή συμφωνία μεταξύ των δύο μερών.'
                    : 'An order is considered confirmed only after a written agreement between both parties.'}
                </li>
                <li>
                  {isGreek
                    ? 'Η Laderos Bags διατηρεί το δικαίωμα να αρνηθεί ή να τροποποιήσει οποιαδήποτε προσφορά.'
                    : 'Laderos Bags reserves the right to decline or modify any quote.'}
                </li>
              </ul>
            </div>

            {/* 4. Intellectual Property */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isGreek ? '4. Πνευματική Ιδιοκτησία' : '4. Intellectual Property'}
              </h2>
              <p className="mb-3">
                {isGreek
                  ? 'Όλο το περιεχόμενο του ιστοτόπου αποτελεί πνευματική ιδιοκτησία της Laderos Bags, εκτός εάν αναφέρεται διαφορετικά. Αυτό περιλαμβάνει:'
                  : 'All website content is the intellectual property of Laderos Bags unless otherwise stated. This includes:'}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{isGreek ? 'Λογότυπα και εμπορικά σήματα' : 'Logos and trademarks'}</li>
                <li>{isGreek ? 'Φωτογραφίες και εικόνες προϊόντων' : 'Product photographs and images'}</li>
                <li>{isGreek ? 'Κείμενα και γραφιστικά στοιχεία' : 'Text content and graphic elements'}</li>
                <li>{isGreek ? 'Σχέδια προϊόντων και δείγματα' : 'Product designs and samples'}</li>
              </ul>
              <p className="mt-3">
                {isGreek
                  ? 'Απαγορεύεται η αναπαραγωγή, αντιγραφή ή χρήση οποιουδήποτε περιεχομένου χωρίς γραπτή άδεια. Τα λογότυπα πελατών που εμφανίζονται στον ιστότοπο ανήκουν στους αντίστοιχους κατόχους τους.'
                  : 'Reproduction, copying, or use of any content without written permission is prohibited. Client logos displayed on the website belong to their respective owners.'}
              </p>
            </div>

            {/* 5. Limitation of Liability */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isGreek ? '5. Περιορισμός Ευθύνης' : '5. Limitation of Liability'}
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  {isGreek
                    ? 'Η Laderos Bags καταβάλλει κάθε δυνατή προσπάθεια ώστε οι πληροφορίες στον ιστότοπο να είναι ακριβείς, αλλά δεν εγγυάται την πληρότητα ή ακρίβειά τους.'
                    : 'Laderos Bags makes every effort to ensure the information on the website is accurate but does not guarantee its completeness or accuracy.'}
                </li>
                <li>
                  {isGreek
                    ? 'Δεν φέρουμε ευθύνη για τυχόν ζημίες που προκύπτουν από τη χρήση ή αδυναμία χρήσης του ιστοτόπου.'
                    : 'We are not liable for any damages arising from the use or inability to use the website.'}
                </li>
                <li>
                  {isGreek
                    ? 'Οι χρώματα και οι διαστάσεις των προϊόντων που εμφανίζονται στον ιστότοπο μπορεί να διαφέρουν ελαφρώς από τα πραγματικά προϊόντα.'
                    : 'Product colors and dimensions displayed on the website may vary slightly from actual products.'}
                </li>
                <li>
                  {isGreek
                    ? 'Δεν φέρουμε ευθύνη για τυχόν απώλεια δεδομένων κατά τη χρήση των φορμών επικοινωνίας.'
                    : 'We are not responsible for any data loss during the use of contact forms.'}
                </li>
              </ul>
            </div>

            {/* 6. Product Liability */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isGreek ? '6. Ευθύνη Προϊόντων' : '6. Product Liability'}
              </h2>
              <p>
                {isGreek
                  ? 'Η ευθύνη για τα κατασκευασμένα προϊόντα ρυθμίζεται από τους ειδικούς όρους που συμφωνούνται κατά την τελική παραγγελία. Ο πελάτης είναι υπεύθυνος για τον έλεγχο των δοκιμίων (proofs) πριν την έναρξη παραγωγής. Η Laderos Bags δεν ευθύνεται για σφάλματα σε σχέδια ή αρχεία που παρέχονται από τον πελάτη.'
                  : 'Liability for manufactured products is governed by the specific terms agreed upon in the final order. The client is responsible for reviewing proofs before production begins. Laderos Bags is not liable for errors in designs or files provided by the client.'}
              </p>
            </div>

            {/* 7. External Links */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isGreek ? '7. Εξωτερικοί Σύνδεσμοι' : '7. External Links'}
              </h2>
              <p>
                {isGreek
                  ? 'Ο ιστότοπος μπορεί να περιέχει συνδέσμους προς εξωτερικούς ιστοτόπους. Δεν φέρουμε καμία ευθύνη για το περιεχόμενο ή τις πρακτικές απορρήτου αυτών των ιστοτόπων.'
                  : 'The website may contain links to external websites. We bear no responsibility for the content or privacy practices of these websites.'}
              </p>
            </div>

            {/* 8. Governing Law */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isGreek ? '8. Εφαρμοστέο Δίκαιο' : '8. Governing Law'}
              </h2>
              <p>
                {isGreek
                  ? 'Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο. Αρμόδια δικαστήρια για οποιαδήποτε διαφορά είναι τα δικαστήρια της Αθήνας.'
                  : 'These terms are governed by Greek law. The courts of Athens have exclusive jurisdiction over any disputes.'}
              </p>
            </div>

            {/* 9. Changes */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isGreek ? '9. Τροποποιήσεις' : '9. Changes'}
              </h2>
              <p>
                {isGreek
                  ? 'Η Laderos Bags διατηρεί το δικαίωμα να τροποποιήσει τους παρόντες όρους ανά πάσα στιγμή. Οι αλλαγές τίθενται σε ισχύ αμέσως μετά τη δημοσίευσή τους στον ιστότοπο.'
                  : 'Laderos Bags reserves the right to modify these terms at any time. Changes take effect immediately upon publication on the website.'}
              </p>
            </div>

            {/* 10. Contact */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                {isGreek ? '10. Επικοινωνία' : '10. Contact'}
              </h2>
              <p className="mb-2">
                {isGreek
                  ? 'Για ερωτήσεις σχετικά με τους όρους χρήσης, επικοινωνήστε μαζί μας:'
                  : 'For questions about these terms, contact us:'}
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                <p><strong>Laderos Bags</strong></p>
                <p>Ελασσώνος 13, Αχαρνές 136 72</p>
                <p>Email: laderosbags@gmail.gr</p>
                <p>{isGreek ? 'Τηλ' : 'Tel'}: 697 266 1870</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfServicePage;
