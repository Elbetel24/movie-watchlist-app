// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: ' import.meta.env.VITE_API_URL', // <-- change to whatever port your Express server runs on
        changeOrigin: true,
      },
    },
  },
})