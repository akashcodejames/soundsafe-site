import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages project site: https://akashcodejames.github.io/soundsafe-site/
  base: "/soundsafe-site/",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
