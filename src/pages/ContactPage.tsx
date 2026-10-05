// Contact Page - Laderos Bags
import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SEO from '@/components/SEO';
import { ADDRESS_LINE, makeBreadcrumbLd } from '@/lib/seo';
import { MapPin, Phone, Mail, Clock, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Reveal } from '@/components/ui/Reveal';
import Layout from '@/components/layout/Layout';
import ContactQuoteForm from '@/components/forms/ContactQuoteForm';
import MapPlaceholder from '@/components/MapPlaceholder';

const ContactPage = () => {
  const { t, language } = useLanguage();
  const { hasConsented } = useCookieConsent();
  const reduced = useReducedMotion();
  const titleWords = t('contact.title').split(' ');

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
      value: ADDRESS_LINE[language === 'en' ? 'en' : 'el'],
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
      value: 'laderosbags@gmail.com',
      href: 'mailto:laderosbags@gmail.com',
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: t('contact.info.hours.value'),
    },
  ];

  return (
    <Layout>
      <SEO routeKey="/contact" jsonLd={makeBreadcrumbLd([[t('nav.home'), '/'], [t('nav.contact'), '/contact']])} />
      {/* Page Title */}
      <section className="main-section pb-16 pt-14 md:pb-24 md:pt-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h1 className="mb-0 text-[clamp(3.4rem,1.6rem+7vw,10rem)] leading-[0.9] tracking-[-0.045em] lg:col-span-8">
              {titleWords.map((word, i) => (
                <Fragment key={i}>
                  <span className="inline-block overflow-hidden pb-[0.12em] pt-[0.08em] -mb-[0.12em] -mt-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={reduced ? false : { y: '115%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.07 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {i < titleWords.length - 1 && ' '}
                </Fragment>
              ))}
            </h1>
            <motion.div
              className="lg:col-span-4 lg:pb-5"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <span className="mb-5 block h-px w-12 bg-brand" />
              <p className="measure text-lg text-ink/70 md:text-xl">
                {t('contact.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="main-section pb-24 md:pb-32">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="eyebrow mb-8">
                  {t('contact.info.title')}
                </h2>
              </Reveal>

              <div className="border-t border-ink/10">
                {contactInfo.map((info, index) => (
                  <Reveal key={index} delay={index * 0.06}>
                    <div className="group grid grid-cols-[3rem_1fr] items-start gap-5 border-b border-ink/10 py-7">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.08)] transition-all duration-500 ease-out-expo group-hover:bg-ink group-hover:text-paper">
                        <info.icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                      </div>
                      <div className="pt-0.5">
                        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                          {info.label}
                        </p>
                        {info.phones ? (
                          <div className="flex flex-col gap-1">
                            {info.phones.map((phone) => (
                              <a key={phone.href} href={phone.href} className="link-underline w-fit font-display text-2xl tracking-[-0.01em] transition-colors hover:text-brand tabular">
                                {phone.value}
                              </a>
                            ))}
                          </div>
                        ) : info.href ? (
                          <a href={info.href} className="link-underline w-fit break-all font-display text-2xl tracking-[-0.01em] transition-colors hover:text-brand">
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-display text-2xl leading-snug tracking-[-0.01em]">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Map */}
            <Reveal delay={0.15} y={50} className="lg:col-span-7">
              <div className="flex h-full flex-col">
                <h2 className="eyebrow mb-8 lg:invisible">
                  {language === 'el' ? 'Χάρτης' : 'Map'}
                </h2>
                <div className="group h-full min-h-[380px] flex-1 overflow-hidden rounded-media shadow-elevated">
                {hasConsented ? (
                  <iframe
                    src="https://maps.google.com/maps?q=38.098358,23.7499251&z=16&hl=el&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '380px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Laderos Bags Location - Acharnes"
                    className="h-full w-full grayscale-[0.85] contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
                  />
                ) : (
                  <MapPlaceholder className="h-full min-h-[380px]" />
                )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <section id="quote" className="scroll-mt-20 pb-[var(--panel-gutter)]">
        <div className="panel ink-section section-padding">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(50% 50% at 0% 0%, hsl(213 66% 45% / 0.22), transparent 70%)' }}
          />
          <div className="container-page relative">
            <Reveal>
              <ContactQuoteForm />
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;