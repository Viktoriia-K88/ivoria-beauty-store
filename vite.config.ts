import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    watch: {
      ignored: ["**/server/cache/**"],
    },
  },

  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
