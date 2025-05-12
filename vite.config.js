// vite.config.js - percorso base relativo per Electron

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // ✅ importante per build Electron
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
