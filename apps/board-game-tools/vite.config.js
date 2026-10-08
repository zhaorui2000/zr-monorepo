import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-netlify";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async () => ({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter({
        edge: false,
        split: false,
      }),
    }),
    tailwindcss(),
  ],
  // build: {
  //   assetsInlineLimit: 0, // 禁用资源内联
  // },
  server: {
    port: 5174,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    optimizeDeps: {
      exclude: [],
    },
  },
}));
