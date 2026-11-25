import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "path";
const side = process.env.ANKI_TEMPLATE_SIDE === "back" ? "back" : "front";
const entry = side === "back" ? "back.html" : "index.html";

function stripComments() {
  return {
    name: "strip-comments",
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        for (const output of Object.values(bundle)) {
          if (output.type !== "asset") continue;

          if (output.fileName.endsWith(".css")) {
            output.source = String(output.source).replace(/\/\*[\s\S]*?\*\//g, "");
          }

          if (output.fileName.endsWith(".html")) {
            output.source = String(output.source)
              .replace(/<!--[\s\S]*?-->/g, "")
              .replace(
                /(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi,
                (_match, start, css, end) =>
                  `${start}${css.replace(/\/\*[\s\S]*?\*\//g, "")}${end}`,
              );
          }
        }
      },
    },
  };
}

export default defineConfig({
  plugins: [
    viteSingleFile({
      outputFileName: `${side}.html`,
    }),
    stripComments(),
    tailwindcss(),
    svelte(),
  ],
  build: {
    emptyOutDir: side === "front",
    minify: "esbuild",
    esbuild: {
      legalComments: "none",
    },
    rollupOptions: {
      input: path.resolve(import.meta.dirname, entry),
      output: {
        format: "iife",
      },
    },
  },
  resolve: {
    alias: {
      "@modules": path.resolve(import.meta.dirname, "./src/modules"),
      "@utils": path.resolve(import.meta.dirname, "./src/utils"),
    },
  },
});
