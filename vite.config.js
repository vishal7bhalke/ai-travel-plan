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
  server: {
    historyApiFallback: true, // Ensures proper routing in dev mode
  },
  build: {
    outDir: "dist", // Ensure the correct output directory
  },
  base: "/", // Important for deployment
});
