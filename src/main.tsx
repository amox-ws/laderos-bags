// Laderos Bags - Main Entry Point v2
import { createRoot } from "react-dom/client";
import { matchPath } from "react-router-dom";
import App, { ROUTES } from "./App.tsx";
import "./index.css";

// Load the current page's code first so the first render is complete (no
// loading flash), then warm up the other pages while the browser is idle.
const current =
  ROUTES.find((r) => r.path !== "*" && matchPath({ path: r.path, end: true }, window.location.pathname)) ??
  ROUTES[ROUTES.length - 1];

current.page.preload().finally(() => {
  createRoot(document.getElementById("root")!).render(<App />);

  const warmUp = () => ROUTES.forEach((r) => r.page.preload());
  if ("requestIdleCallback" in window) window.requestIdleCallback(warmUp, { timeout: 4000 });
  else setTimeout(warmUp, 2000);
});
