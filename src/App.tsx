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
import { OPTIKA, PAIDIKA, ANDRIKA, GYNAIKEIA, OIKOLOGIKA } from "./content/categories";
import { lazyPage } from "@/lib/lazyPage";
import { EN_PREFIX } from "@/lib/i18nPaths";

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

/** Route table (Greek paths), shared by the browser app and the build-time prerender. */
const BASE_ROUTES = [
  { path: "/", page: HomePage, element: <HomePage /> },
  { path: "/about", page: AboutPage, element: <AboutPage /> },
  { path: "/products", page: ProductsPage, element: <ProductsPage /> },
  { path: "/products/paper-bags", page: PaperBagsPage, element: <PaperBagsPage /> },
  { path: "/products/plastic-bags", page: PlasticBagsPage, element: <PlasticBagsPage /> },
  { path: "/products/optika", page: CategoryPage, element: <CategoryPage content={OPTIKA} /> },
  { path: "/products/paidika", page: CategoryPage, element: <CategoryPage content={PAIDIKA} /> },
  { path: "/products/andrika", page: CategoryPage, element: <CategoryPage content={ANDRIKA} /> },
  { path: "/products/gynaikeia", page: CategoryPage, element: <CategoryPage content={GYNAIKEIA} /> },
  { path: "/products/oikologika", page: CategoryPage, element: <CategoryPage content={OIKOLOGIKA} /> },
  { path: "/contact", page: ContactPage, element: <ContactPage /> },
  { path: "/privacy-policy", page: PrivacyPolicyPage, element: <PrivacyPolicyPage /> },
  // Add new pages here (Greek path) — the /en version is created automatically below.
];

/** Greek routes plus their English twins under /en, then the 404 catch-all. */
export const ROUTES = [
  ...BASE_ROUTES,
  ...BASE_ROUTES.map((r) => ({ ...r, path: r.path === "/" ? EN_PREFIX : `${EN_PREFIX}${r.path}` })),
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
      <CookieConsentProvider>
      <TooltipProvider>
        <Analytics />
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
      </CookieConsentProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export const AppRoutes = () => (
  <LanguageProvider>
    <ScrollToTop />
    <Suspense fallback={null}>
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  </LanguageProvider>
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
