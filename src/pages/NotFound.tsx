import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[82vh] flex items-center justify-center main-section relative overflow-hidden">
        <div className="container-page text-center relative z-10 flex flex-col items-center py-24">
          <span className="font-display font-semibold text-[9rem] md:text-[15rem] leading-[0.8] text-primary/15 select-none" aria-hidden>
            404
          </span>
          <span className="section-label justify-center -mt-6 md:-mt-12">
            {language === "el" ? "Σφάλμα" : "Error"}
          </span>
          <h1 className="mb-6 max-w-2xl">
            {language === "el" ? "Η σελίδα δεν βρέθηκε" : "Page not found"}
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-md">
            {language === "el"
              ? "Η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί."
              : "The page you are looking for doesn't exist or has moved."}
          </p>
          <Button asChild variant="default" size="lg" className="group">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {language === "el" ? "Επιστροφή στην Αρχική" : "Back to Home"}
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
