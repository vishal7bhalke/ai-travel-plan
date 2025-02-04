import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Ensure this matches your Netlify publish directory
  },
  server: {
    historyApiFallback: true, // Ensures client-side routing works
  },
});
