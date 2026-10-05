// Quote Request Modal Component - Laderos Bags
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { lockScroll } from '@/lib/smoothScroll';
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

  // Freeze the page behind the dialog and let Escape close it
  useEffect(() => {
    if (!isOpen) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  // Rendered into <body>: inside the page it would sit under the sliding footer.
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-ink/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto p-3 md:items-center md:p-6"
            data-lenis-prevent
            onClick={onClose}
          >
            <div 
              className="relative my-6 w-full max-w-5xl overflow-hidden rounded-[2rem] bg-paper shadow-[0_60px_120px_-40px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button - Fixed on mobile for visibility */}
              <button
                onClick={onClose}
                className="fixed right-4 top-4 z-[120] flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink shadow-lg transition-transform duration-500 ease-out-expo hover:rotate-90 md:absolute md:right-5 md:top-5"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Summary */}
                <div className="p-7 md:p-10 lg:p-12">
                  <div className="mb-6">
                    <p className="eyebrow mb-5">{t('quoteForm.title')}</p>
                    <h3 className="mb-2 text-[clamp(2rem,1.5rem+1.6vw,3rem)] text-ink">
                      {bagType === 'paper' 
                        ? (language === 'el' ? 'Χάρτινες Σακούλες' : 'Paper Bags')
                        : (language === 'el' ? 'Πλαστικές Σακούλες' : 'Plastic Bags')
                      }
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {summary.map((item, index) => (
                      <div key={index} className="grid grid-cols-[minmax(0,9rem)_1fr] gap-4 border-b border-ink/10 py-3.5 last:border-0">
                        <p className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                          {item.label}
                        </p>
                        <p className="text-[15px] text-ink">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-10 inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-ink/70 shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.15)] transition-all duration-500 hover:text-ink hover:shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.5)]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t('quoteForm.modal.modify')}
                  </button>
                </div>

                {/* Right Side - Contact Form */}
                <div className="relative overflow-hidden bg-ink p-7 md:p-10 lg:p-12">
                  <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(70% 50% at 100% 0%, hsl(213 66% 45% / 0.35), transparent 70%)' }} />
                  <h3 className="relative mb-8 text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)] text-paper">
                    {t('quoteForm.modal.title')}
                  </h3>

                  <form onSubmit={handleSubmit} className="relative space-y-5">
                    <div>
                      <Label 
                        htmlFor="fullName" 
                        className="font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-paper/55"
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
                        className="mt-2 h-12 rounded-xl border-0 bg-paper/[0.07] text-paper ring-1 ring-inset ring-paper/15 placeholder:text-paper/30 focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-0"
                        placeholder={language === 'el' ? 'Εισάγετε το όνομά σας' : 'Enter your name'}
                      />
                    </div>

                    <div>
                      <Label 
                        htmlFor="email" 
                        className="font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-paper/55"
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
                        className="mt-2 h-12 rounded-xl border-0 bg-paper/[0.07] text-paper ring-1 ring-inset ring-paper/15 placeholder:text-paper/30 focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-0"
                        placeholder={language === 'el' ? 'email@example.com' : 'email@example.com'}
                      />
                    </div>

                    <div>
                      <Label 
                        htmlFor="phone" 
                        className="font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-paper/55"
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
                        className="mt-2 h-12 rounded-xl border-0 bg-paper/[0.07] text-paper ring-1 ring-inset ring-paper/15 placeholder:text-paper/30 focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-0"
                        placeholder={language === 'el' ? '+30 210 1234567' : '+30 210 1234567'}
                      />
                    </div>

                    <div>
                      <Label 
                        htmlFor="message" 
                        className="font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-paper/55"
                      >
                        {t('quoteForm.modal.message')}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={contactData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-2 resize-none rounded-xl border-0 bg-paper/[0.07] text-paper ring-1 ring-inset ring-paper/15 placeholder:text-paper/30 focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-0"
                        placeholder={language === 'el' ? 'Πρόσθετες πληροφορίες (προαιρετικό)' : 'Additional information (optional)'}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="!mt-8 h-14 w-full bg-paper text-base text-ink hover:bg-white"
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
                      className="mt-3 h-12 w-full text-base text-paper shadow-[inset_0_0_0_1px_hsl(var(--paper)/0.25)] hover:bg-paper/10 hover:text-paper md:hidden"
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
    </AnimatePresence>,
    document.body
  );
};

export default QuoteRequestModal;
