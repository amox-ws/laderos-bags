// About Page - Laderos Bags
import { motion } from 'framer-motion';
import { Factory, Package, Award, Users, Play, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedStatsSection from '@/components/home/AnimatedStatsSection';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  const { t } = useLanguage();

  const services = [
    { key: 'customManufacturing', icon: Factory },
    { key: 'paperPlastic', icon: Package },
    { key: 'qualityConsistency', icon: Award },
    { key: 'b2bPartnerships', icon: Users },
  ];

  const whyWorkWithUs = [
    'whyWork.experience',
    'whyWork.reliability',
    'whyWork.cooperation',
    'whyWork.consistency',
  ];

  return (
    <Layout>
      {/* Hero Section with Video Placeholder */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Video Placeholder Background */}
        <div className="absolute inset-0 bg-muted">
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/50 to-foreground/70" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
          {/* Placeholder pattern for video */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)'
          }} />
        </div>
        
        {/* Hero Content */}
        <div className="container-page relative z-10 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-wide">
              {t('about.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section-padding bg-background">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-elevated">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors duration-300">
                    <Play className="w-10 h-10 text-primary ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                  {t('about.videoPlaceholder')}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t('about.whoWeAre.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t('about.whoWeAre.text')}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-page">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.whatWeDo.title')}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.key} delay={index * 0.1}>
                <div className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-elevated transition-shadow duration-300 h-full">
                  <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-7 w-7 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(`about.services.${service.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(`about.services.${service.key}.desc`)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Video/Visual Section */}
      <section className="section-padding bg-background">
        <div className="container-page">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.production.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('about.production.text')}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-elevated max-w-4xl mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors duration-300">
                  <Play className="w-10 h-10 text-primary ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                {t('about.videoPlaceholder')}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Statistics Section */}
      <AnimatedStatsSection />

      {/* Why Work With Us Section */}
      <section className="section-padding bg-background">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('about.whyWork.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('about.whyWork.text')}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                {whyWorkWithUs.map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-secondary rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {t(`about.${key}.title`)}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t(`about.${key}.desc`)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-hero">
        <div className="container-page text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/contact" className="inline-flex items-center gap-2">
                {t('about.cta.button')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
