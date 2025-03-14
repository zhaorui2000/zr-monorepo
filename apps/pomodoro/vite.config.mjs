import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  build:{
    outDir:"www"
  },
  resolve: {
    alias: {
      "@assets": resolve(__dirname, 'src/assets'),
      "@utils": resolve(__dirname, 'src/utils'),
    },
  },  
})
