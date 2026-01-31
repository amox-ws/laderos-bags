// About Page - Laderos Bags
import { motion } from 'framer-motion';
import { Factory, Package, Award, Users, Play, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedStatsSection from '@/components/home/AnimatedStatsSection';
import TrustedBySection from '@/components/home/TrustedBySection';
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
      {/* Hero Section - Level 1 (Lightest) */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden section-depth-1">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,0.03) 35px, rgba(0,0,0,0.03) 70px)'
        }} />
        
        {/* Hero Content */}
        <div className="container-page relative z-10 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide">
              {t('about.hero.title')}
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section - Level 2 */}
      <section className="section-padding section-depth-2">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="relative aspect-video bg-white/10 rounded-2xl overflow-hidden shadow-elevated">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors duration-300">
                    <Play className="w-10 h-10 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-sm opacity-60">
                  {t('about.videoPlaceholder')}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {t('about.whoWeAre.title')}
                </h2>
                <p className="leading-relaxed text-lg opacity-80">
                  {t('about.whoWeAre.text')}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Do Section - Level 3 */}
      <section className="section-padding section-depth-3">
        <div className="container-page">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.whatWeDo.title')}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.key} delay={index * 0.1}>
                <div className="bg-white/10 rounded-xl p-6 text-center shadow-card hover:shadow-elevated transition-shadow duration-300 h-full">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`about.services.${service.key}.title`)}
                  </h3>
                  <p className="text-sm opacity-80">
                    {t(`about.services.${service.key}.desc`)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who Trusts Us Section - Level 3 (continued) */}
      <div className="section-depth-3">
        <TrustedBySection />
      </div>

      {/* Video/Visual Section - Level 4 */}
      <section className="section-padding section-depth-4">
        <div className="container-page">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.production.title')}
            </h2>
            <p className="opacity-80 max-w-2xl mx-auto">
              {t('about.production.text')}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative aspect-video bg-white/10 rounded-2xl overflow-hidden shadow-elevated max-w-4xl mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors duration-300">
                  <Play className="w-10 h-10 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-sm opacity-60">
                {t('about.videoPlaceholder')}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Statistics Section - Level 4 (continued) */}
      <div className="section-depth-4">
        <AnimatedStatsSection />
      </div>

      {/* Why Work With Us Section - Level 5 */}
      <section className="section-padding section-depth-5">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('about.whyWork.title')}
              </h2>
              <p className="leading-relaxed mb-8 opacity-80">
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
                    className="flex items-start gap-4 p-4 bg-white/10 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {t(`about.${key}.title`)}
                      </h4>
                      <p className="text-sm opacity-80">
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

      {/* CTA Section - Level 6 (Darkest) */}
      <section className="section-padding section-depth-6">
        <div className="container-page text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="opacity-80 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/contact#quote" className="inline-flex items-center gap-2">
                {t('cta.button')}
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
