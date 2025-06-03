// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/spotifyV2/',
  server: {
    allowedHosts: 'all', // ✅ Allow all hosts (includes trycloudflare.com)
  },
})
