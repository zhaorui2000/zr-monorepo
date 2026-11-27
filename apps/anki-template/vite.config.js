import { readFileSync, writeFileSync } from "node:fs";
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
    writeBundle(outputOptions, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== "asset") continue;

        const filePath = path.resolve(
          outputOptions.dir ?? "dist",
          output.fileName,
        );
        if (output.fileName.endsWith(".css")) {
          writeFileSync(
            filePath,
            readFileSync(filePath, "utf8").replace(/\/\*[\s\S]*?\*\//g, ""),
          );
        }

        if (output.fileName.endsWith(".html")) {
          const html = readFileSync(filePath, "utf8")
            .replace(/<!--[\s\S]*?-->/g, "")
            .replace(
              /(<script\b[^>]*>)([\s\S]*?)(<\/script>)/gi,
              (_match, start, script, end) =>
                `${start}${script.replace(/\{\{(?![^{}\r\n]+\}\})/g, "{ {")}${end}`,
            )
            .replace(
              /(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi,
              (_match, start, css, end) =>
                `${start}${css.replace(/\/\*[\s\S]*?\*\//g, "")}${end}`,
            );
          writeFileSync(filePath, html);
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    viteSingleFile({
      outputFileName: `${side}.html`,
    }),
    tailwindcss(),
    svelte(),
    stripComments(),
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
