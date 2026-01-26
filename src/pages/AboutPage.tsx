import { motion } from 'framer-motion';
import { Target, Award, Lightbulb, Leaf, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Layout from '@/components/layout/Layout';
import factoryImage from '@/assets/factory.jpg';

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    { key: 'quality', icon: Award },
    { key: 'reliability', icon: CheckCircle2 },
    { key: 'innovation', icon: Lightbulb },
    { key: 'sustainability', icon: Leaf },
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
              {t('about.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={factoryImage}
                  alt="Laderos Bags Manufacturing Facility"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t('about.story.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t('about.story.text')}
                </p>

                <div className="bg-secondary rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t('about.mission.title')}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t('about.mission.text')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-page">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.values.title')}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.key} delay={index * 0.1}>
                <div className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-elevated transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(`about.values.${value.key}`)}
                  </h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding gradient-hero">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '20+', label: 'Χρόνια Εμπειρίας' },
              { value: '500+', label: 'Πελάτες' },
              { value: '1M+', label: 'Σακούλες/Μήνα' },
              { value: '100%', label: 'Ικανοποίηση' },
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/70 text-sm">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
