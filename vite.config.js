import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import browserslist from "browserslist";
// import { browserslistToTargets } from "lightningcss";

export default defineConfig({
  plugins: [vue()],
  root: path.resolve(__dirname, "src"),
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      "@": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/core"),
      "@timer": path.resolve(__dirname, "src/timer"),
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ["import"],
      },
    },
  },
});
