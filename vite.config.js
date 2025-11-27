import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '../public',
    emptyOutDir: true,
  },
  root: './front',
  cacheDir: '../node_modules/.vite_front',
})
