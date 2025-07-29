// ⚙️ vite.config.js — Vite + React + Tailwind + Test Proxy Setup

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load environment variables from .env

export default defineConfig({
  plugins: [
    react(),        // 📦 React plugin for JSX and Fast Refresh
    tailwindcss(),  // 🎨 Tailwind plugin for utility-first CSS
  ],

  // 🌐 Dev Server Configuration
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL, // 🔗 Use env for backend base URL
        changeOrigin: true,
        secure: false,                         // 🛡️ Accept self-signed SSL if needed
      },
    },
  },

  // 🧪 Testing Setup with Vitest
  test: {
    globals: true,                 // 🌍 Enable global test variables
    environment: 'jsdom',          // 🖥️ Simulate browser-like environment
    setupFiles: './src/setupTests.js', // 🧰 Pre-test setup config
  },
});
