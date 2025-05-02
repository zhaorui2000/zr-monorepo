import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [wasm(), topLevelAwait(), sveltekit(), tailwindcss()],
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
