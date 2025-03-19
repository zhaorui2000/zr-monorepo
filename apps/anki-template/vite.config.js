import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from "vite-plugin-singlefile"
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [ viteSingleFile(),tailwindcss(),svelte()],
  build: {
    // Do not compress, compressed and pasted to anki template recognition problem
    minify: false
  },
  resolve: {
    alias: {
      "@modules": path.resolve(__dirname, "./src/modules")
    }
  }
})
