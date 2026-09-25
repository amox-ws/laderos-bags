import { Suspense, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import ScrollToTop from "@/components/ScrollToTop";
import { OPTIKA, PAIDIKA } from "./content/categories";
import { lazyPage } from "@/lib/lazyPage";

import { Analytics } from "@vercel/analytics/react";

// Each page is its own JS chunk. main.tsx loads the current page's chunk before
// the first render, so there is never a loading flash (see lib/lazyPage.tsx).
const HomePage = lazyPage(() => import("./pages/HomePage"));
const AboutPage = lazyPage(() => import("./pages/AboutPage"));
const ProductsPage = lazyPage(() => import("./pages/ProductsPage"));
const PaperBagsPage = lazyPage(() => import("./pages/PaperBagsPage"));
const PlasticBagsPage = lazyPage(() => import("./pages/PlasticBagsPage"));
const CategoryPage = lazyPage(() => import("./pages/CategoryPage"));
const ContactPage = lazyPage(() => import("./pages/ContactPage"));
const PrivacyPolicyPage = lazyPage(() => import("./pages/PrivacyPolicyPage"));
const NotFound = lazyPage(() => import("./pages/NotFound"));

/** Route table, shared by the browser app and the build-time prerender. */
export const ROUTES = [
  { path: "/", page: HomePage, element: <HomePage /> },
  { path: "/about", page: AboutPage, element: <AboutPage /> },
  { path: "/products", page: ProductsPage, element: <ProductsPage /> },
  { path: "/products/paper-bags", page: PaperBagsPage, element: <PaperBagsPage /> },
  { path: "/products/plastic-bags", page: PlasticBagsPage, element: <PlasticBagsPage /> },
  { path: "/products/optika", page: CategoryPage, element: <CategoryPage content={OPTIKA} /> },
  { path: "/products/paidika", page: CategoryPage, element: <CategoryPage content={PAIDIKA} /> },
  { path: "/contact", page: ContactPage, element: <ContactPage /> },
  { path: "/privacy-policy", page: PrivacyPolicyPage, element: <PrivacyPolicyPage /> },
  // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
  { path: "*", page: NotFound, element: <NotFound /> },
];

const queryClient = new QueryClient();

/** Everything except the router, so the server can supply its own. */
export const AppProviders = ({
  children,
  helmetContext,
}: {
  children: ReactNode;
  helmetContext?: object;
}) => (
  <HelmetProvider context={helmetContext}>
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CookieConsentProvider>
      <TooltipProvider>
        <Analytics />
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
      </CookieConsentProvider>
    </LanguageProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Suspense fallback={null}>
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  </>
);

// Main App Component - Laderos Bags Website v4 - rebuild
const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
