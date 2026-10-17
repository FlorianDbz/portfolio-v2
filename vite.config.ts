import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // three.js est chargé à part (lazy), après le texte
  build: { chunkSizeWarningLimit: 1200 },
})
