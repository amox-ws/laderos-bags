// Quote Request Modal Component - Laderos Bags
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type BagType = 'paper' | 'plastic';

interface CustomSize {
  height: string;
  width: string;
  gusset: string;
}

interface FormData {
  bagType: BagType;
  size: string;
  customSize: CustomSize;
  handle: string;
  finishing: string[];
  printing: string;
  extraProcessing: string[];
}

interface SummaryItem {
  label: string;
  value: string;
}

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  summary: SummaryItem[];
  bagType: BagType;
}

const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  formData,
  summary,
  bagType,
}) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [contactData, setContactData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactData.fullName.trim() || !contactData.email.trim() || !contactData.phone.trim()) {
      toast({
        title: language === 'el' ? 'Σφάλμα' : 'Error',
        description: language === 'el' 
          ? 'Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία'
          : 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      toast({
        title: language === 'el' ? 'Σφάλμα' : 'Error',
        description: language === 'el' 
          ? 'Παρακαλώ εισάγετε ένα έγκυρο email'
          : 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Prepare form data for Formspree
    const submissionData = new FormData();
    submissionData.append('_subject', `Quote Request - ${bagType === 'paper' ? 'Paper Bags' : 'Plastic Bags'}`);
    submissionData.append('Bag Type', bagType === 'paper' ? 'Paper Bags' : 'Plastic Bags');
    submissionData.append('Full Name', contactData.fullName);
    submissionData.append('Email', contactData.email);
    submissionData.append('Phone', contactData.phone);
    submissionData.append('Message', contactData.message || 'N/A');
    
    // Add form selections to submission
    summary.forEach(item => {
      submissionData.append(item.label, item.value);
    });
    
    // Add custom size details if custom size was selected
    if (formData.size === 'custom' && formData.customSize) {
      const { height, width, gusset } = formData.customSize;
      if (height || width || gusset) {
        submissionData.append('Custom Height (cm)', height || 'N/A');
        submissionData.append('Custom Width (cm)', width || 'N/A');
        submissionData.append('Custom Gusset (cm)', gusset || 'N/A');
      }
    }

    try {
      const response = await fetch('https://formspree.io/f/xwvoybjj', {
        method: 'POST',
        body: submissionData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: language === 'el' ? 'Επιτυχία!' : 'Success!',
          description: language === 'el'
            ? 'Το αίτημά σας υποβλήθηκε επιτυχώς. Θα επικοινωνήσουμε σύντομα μαζί σας.'
            : 'Your request has been submitted successfully. We will contact you soon.',
        });
        setContactData({ fullName: '', email: '', phone: '', message: '' });
        onClose();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: language === 'el' ? 'Σφάλμα' : 'Error',
        description: language === 'el'
          ? 'Υπήρξε πρόβλημα με την υποβολή. Παρακαλώ δοκιμάστε ξανά.'
          : 'There was a problem with your submission. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div 
              className="relative w-full max-w-5xl bg-background rounded-xl shadow-2xl overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Fixed on mobile for visibility */}
              <button
                onClick={onClose}
                className="fixed md:absolute top-4 right-4 md:top-4 md:right-4 z-[60] p-3 md:p-2 rounded-full bg-white shadow-lg md:shadow-md hover:bg-gray-100 transition-colors"
                style={{ 
                  paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
                  paddingRight: 'max(0.75rem, env(safe-area-inset-right))'
                }}
                aria-label="Close"
              >
                <X className="h-6 w-6 md:h-5 md:w-5 text-foreground" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Summary */}
                <div className="bg-card p-6 md:p-8 lg:p-10">
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {bagType === 'paper' 
                        ? (language === 'el' ? 'Χάρτινες Σακούλες' : 'Paper Bags')
                        : (language === 'el' ? 'Πλαστικές Σακούλες' : 'Plastic Bags')
                      }
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {summary.map((item, index) => (
                      <div key={index} className="border-b border-border pb-3 last:border-0">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        <p className="text-foreground font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-8 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground border border-border rounded-md hover:bg-muted transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t('quoteForm.modal.modify')}
                  </button>
                </div>

                {/* Right Side - Contact Form */}
                <div className="bg-brand p-6 md:p-8 lg:p-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-accent-foreground mb-6">
                    {t('quoteForm.modal.title')}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label 
                        htmlFor="fullName" 
                        className="text-xs font-semibold text-accent-foreground/90 uppercase tracking-wider"
                      >
                        {t('quoteForm.modal.fullName')} *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={contactData.fullName}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-white/90 border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent-foreground/50"
                        placeholder={language === 'el' ? 'Εισάγετε το όνομά σας' : 'Enter your name'}
                      />
                    </div>

                    <div>
                      <Label 
                        htmlFor="email" 
                        className="text-xs font-semibold text-accent-foreground/90 uppercase tracking-wider"
                      >
                        {t('quoteForm.modal.email')} *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={contactData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-white/90 border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent-foreground/50"
                        placeholder={language === 'el' ? 'email@example.com' : 'email@example.com'}
                      />
                    </div>

                    <div>
                      <Label 
                        htmlFor="phone" 
                        className="text-xs font-semibold text-accent-foreground/90 uppercase tracking-wider"
                      >
                        {t('quoteForm.modal.phone')} *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={contactData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-white/90 border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent-foreground/50"
                        placeholder={language === 'el' ? '+30 210 1234567' : '+30 210 1234567'}
                      />
                    </div>

                    <div>
                      <Label 
                        htmlFor="message" 
                        className="text-xs font-semibold text-accent-foreground/90 uppercase tracking-wider"
                      >
                        {t('quoteForm.modal.message')}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={contactData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-2 bg-white/90 border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent-foreground/50 resize-none"
                        placeholder={language === 'el' ? 'Πρόσθετες πληροφορίες (προαιρετικό)' : 'Additional information (optional)'}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-navy-light transition-colors py-6 text-base font-semibold"
                    >
                      {isSubmitting 
                        ? (language === 'el' ? 'Υποβολή...' : 'Submitting...') 
                        : t('quoteForm.modal.submit')
                      }
                    </Button>

                    {/* Cancel button - visible on mobile as secondary close option */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="w-full md:hidden mt-3 py-5 text-base font-medium border-white/30 text-white hover:bg-white/10"
                    >
                      {language === 'el' ? 'Ακύρωση' : 'Cancel'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuoteRequestModal;
