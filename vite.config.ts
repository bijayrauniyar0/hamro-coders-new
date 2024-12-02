import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3030,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Animations': path.resolve(__dirname, './src/animations'),
      '@Assets': path.resolve(__dirname, './src/assets'),
      '@Components': path.resolve(__dirname, './src/components'),
      '@Hooks': path.resolve(__dirname, './src/hooks'),
      '@Store': path.resolve(__dirname, './src/store'),
      '@Views': path.resolve(__dirname, './src/views'),
      '@Services': path.resolve(__dirname, './src/services'),
      '@Utils': path.resolve(__dirname, './src/utils'),
      '@Types': path.resolve(__dirname, './src/types'),
      '@Constants': path.resolve(__dirname, './src/constants'),
    },
  },
});
