import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    
    tailwindcss()
  ],
  server: {
    hot: true, // Enable HMR
    watch: {
      usePolling: true, // Fixes file watching issues
    },
  },
})
