import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  test: {
    environment: 'jsdom', 
    globals: true,
    setupFiles: './src/setupTests.js', 
  },
  server:{
port:3000
  },
  base: '/React-Weather-App/'
})
