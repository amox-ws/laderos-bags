import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Μήνυμα Εστάλη!',
      description: 'Θα επικοινωνήσουμε μαζί σας σύντομα.',
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: 'Λεωφ. Κηφισού 123, Αθήνα 10442',
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: '+30 210 1234567',
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: 'info@laderosbags.gr',
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: t('contact.info.hours.value'),
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section-padding">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')}</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Ιωάννης Παπαδόπουλος"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact.form.email')}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+30 210 1234567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t('contact.form.company')}</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Η επιχείρησή σας"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Πώς μπορούμε να σας βοηθήσουμε;"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="brand"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Αποστολή...'
                    ) : (
                      <>
                        {t('contact.form.submit')}
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {t('contact.info.title')}
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-secondary rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-brand" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {info.label}
                        </p>
                        <p className="font-medium text-foreground">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 rounded-xl overflow-hidden h-64 bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50471.54744927897!2d23.68604!3d37.99083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd1f067043f1%3A0x2736354576668ddd!2sAthens%2C%20Greece!5e0!3m2!1sen!2s!4v1706000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Laderos Bags Location"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
