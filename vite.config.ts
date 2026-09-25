import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  // Build-time prerender (src/entry-server.tsx): bundle CJS-only packages so Node
  // can import the server build. The client manifest maps routes → JS chunks.
  ssr: {
    noExternal: ["react-helmet-async"],
  },
  build: {
    manifest: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
