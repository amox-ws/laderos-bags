// Contact Page - Laderos Bags
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import ContactQuoteForm from '@/components/forms/ContactQuoteForm';
import MapPlaceholder from '@/components/MapPlaceholder';

const ContactPage = () => {
  const { t, language } = useLanguage();
  const { hasConsented } = useCookieConsent();

  const contactInfo: {
    icon: LucideIcon;
    label: string;
    value?: string;
    href?: string;
    phones?: { value: string; href: string }[];
  }[] = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: 'Ελασσώνος 13, Αχαρνές 136 72',
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      phones: [
        { value: '697 266 1870', href: 'tel:+306972661870' },
        { value: '210 244 3550', href: 'tel:+302102443550' },
        { value: '210 244 3800', href: 'tel:+302102443800' },
      ],
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: 'laderosbags@gmail.gr',
      href: 'mailto:laderosbags@gmail.gr',
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: t('contact.info.hours.value'),
    },
  ];

  return (
    <Layout>
      {/* Page Title */}
      <section className="py-20 md:py-28 main-section">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="mb-6">
              {t('contact.title')}
            </h1>
            <div className="w-16 h-[2px] bg-primary/40 mb-6" />
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="section-padding pt-0 main-section">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Information */}
            <AnimatedSection>
              <div className="h-full">
                <h2 className="text-xl mb-10" style={{ fontFamily: 'Inter, system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '13px', fontWeight: 600 }}>
                  {t('contact.info.title')}
                </h2>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-5 p-6 bg-white rounded-xl border border-border/40 shadow-card hover:shadow-card-hover transition-all duration-500"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-1.5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          {info.label}
                        </p>
                        {info.phones ? (
                          <div className="flex flex-col gap-1">
                            {info.phones.map((phone) => (
                              <a key={phone.href} href={phone.href} className="font-medium hover:text-primary transition-colors">
                                {phone.value}
                              </a>
                            ))}
                          </div>
                        ) : info.href ? (
                          <a href={info.href} className="font-medium hover:text-primary transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection delay={0.2}>
              <div className="h-full flex flex-col">
                <h2 className="text-xl mb-10 lg:invisible" style={{ fontFamily: 'Inter, system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '13px', fontWeight: 600 }}>
                  {language === 'el' ? 'Χάρτης' : 'Map'}
                </h2>
                <div className="flex-1 rounded-2xl overflow-hidden min-h-[350px] shadow-elevated">
                {hasConsented ? (
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
                ) : (
                  <MapPlaceholder className="min-h-[350px] h-full" />
                )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <section id="quote" className="section-padding accent-section scroll-mt-20">
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