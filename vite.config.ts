import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        support: resolve(__dirname, 'support/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})
