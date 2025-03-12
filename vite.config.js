import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  test: {
    environment: 'jsdom', // هذا مهم لاختبار المكونات
    globals: true, // لجعل expect() يعمل بدون import
    setupFiles: './src/setupTests.js', // لتشغيل إعدادات الاختبار قبل كل اختبار
  },
  server:{
port:3000
  },
})
