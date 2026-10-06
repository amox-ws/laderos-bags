// Laderos Bags - Main Entry Point v2
import { createRoot, hydrateRoot } from "react-dom/client";
import { matchPath } from "react-router-dom";
import App, { ROUTES } from "./App.tsx";
import "./index.css";

// Load the current page's code first so the first render is complete (no
// loading flash), then warm up the other pages while the browser is idle.
const current =
  ROUTES.find((r) => r.path !== "*" && matchPath({ path: r.path, end: true }, window.location.pathname)) ??
  ROUTES[ROUTES.length - 1];

current.page.preload().finally(() => {
  const rootEl = document.getElementById("root")!;
  // The home page keeps its prerendered markup (its headline animates in with CSS
  // before any JS runs, so rebuilding the DOM would restart that animation).
  // Other pages are rebuilt on the client as before.
  const isHome = /^\/(en)?\/?$/.test(window.location.pathname);
  if (isHome && rootEl.hasChildNodes()) hydrateRoot(rootEl, <App />);
  else createRoot(rootEl).render(<App />);

  const warmUp = () => ROUTES.forEach((r) => r.page.preload());
  if ("requestIdleCallback" in window) window.requestIdleCallback(warmUp, { timeout: 4000 });
  else setTimeout(warmUp, 2000);
});
