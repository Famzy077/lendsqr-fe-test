// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // Vite configuration for a React application
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist'
//   },
//   server: {
//     // No need for historyApiFallback; Vite handles SPA fallback automatically
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This tells Vite that any request to /api should be sent to your json-server
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // removes /api from the start of the path
      },
    }
  }
})
