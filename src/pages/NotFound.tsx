import { useLocation } from "react-router-dom";
import SEO from '@/components/SEO';
import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ArrowButton from "@/components/ui/ArrowButton";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const reduced = useReducedMotion();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEO noindex />
      <section className="main-section relative flex min-h-[86vh] items-center justify-center overflow-hidden">
        <div className="container-page relative z-10 flex flex-col items-center py-24 text-center">
          <motion.span
            aria-hidden
            className="select-none font-display text-[clamp(9rem,6rem+16vw,22rem)] font-light italic leading-[0.8] tracking-[-0.06em]"
            style={{
              backgroundImage: 'linear-gradient(180deg, hsl(213 66% 45% / 0.9), hsl(213 66% 45% / 0.08))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            404
          </motion.span>
          <motion.div
            className="flex flex-col items-center"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h1 className="mb-6 mt-4 max-w-2xl text-[clamp(2.4rem,1.6rem+3vw,4.5rem)]">
              {language === "el" ? "Η σελίδα δεν βρέθηκε" : "Page not found"}
            </h1>
            <p className="mb-12 max-w-md text-lg text-ink/65">
              {language === "el"
                ? "Η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί."
                : "The page you are looking for doesn't exist or has moved."}
            </p>
            <ArrowButton to="/" back>
              {language === "el" ? "Επιστροφή στην Αρχική" : "Back to Home"}
            </ArrowButton>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
