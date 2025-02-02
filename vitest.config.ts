// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  base: '/harun8.github.io/',
  plugins: [vue(), vuetify({ autoImport: true })],
  // other configurations...
})
