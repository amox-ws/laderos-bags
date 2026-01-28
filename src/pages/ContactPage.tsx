// Contact Page - Laderos Bags
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import ContactQuoteForm from '@/components/forms/ContactQuoteForm';

const ContactPage = () => {
  const { t, language } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: 'Ελασσώνος 13, Αχαρνές 136 72',
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: '697 266 1870',
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: 'laderosbags@gmail.gr',
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: t('contact.info.hours.value'),
    },
  ];

  return (
    <Layout>
      {/* Page Title Section - No Hero, Simple Title */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-wide mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Map Section */}
      <section className="section-padding pt-0">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <AnimatedSection>
              <div className="h-full">
                <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mb-8">
                  {t('contact.info.title')}
                </h2>

                <div className="space-y-4">
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
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection delay={0.2}>
              <div className="h-full flex flex-col">
                <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mb-8 lg:invisible">
                  {language === 'el' ? 'Χάρτης' : 'Map'}
                </h2>
                <div className="flex-1 rounded-xl overflow-hidden min-h-[350px] shadow-card">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.8876844456196!2d23.7244!3d38.0846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1999c7c9c7c9d%3A0x7c9c7c9c7c9c7c9c!2sElassonos%2013%2C%20Acharnes%20136%2072%2C%20Greece!5e0!3m2!1sen!2s!4v1706000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '350px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Laderos Bags Location - Acharnes"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-page">
          <AnimatedSection>
            <ContactQuoteForm />
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
