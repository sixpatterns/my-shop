import react from "@vitejs/plugin-react";
import rails from "rails-vite-plugin";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // System tests run Rails on a random port, so call the API on the same host.
  define:
    mode === "test"
      ? { "import.meta.env.VITE_API_BASE_URL": "window.location.origin" }
      : {},
  plugins: [react(), rails({ input: "main.tsx", sourceDir: "frontend" })],
}));
