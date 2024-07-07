

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true, // Keep this to see error overlay
    },
    port: 5174,
    open: true, // Automatically open the browser on server start
  },
  build: {
    sourcemap: true, // Enable sourcemaps for easier debugging
  },
})
