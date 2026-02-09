import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Handle home page with products-section anchor
    if (pathname === '/' && hash === '#products-section') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      isInitialLoad.current = false;
      return;
    }

    if (hash) {
      // If there's a hash, scroll to that element
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Otherwise scroll to top
      window.scrollTo(0, 0);
    }
    
    isInitialLoad.current = false;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
