import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ingest': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/search': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
