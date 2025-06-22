import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for a React application
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    // No need for historyApiFallback; Vite handles SPA fallback automatically
  }
})
