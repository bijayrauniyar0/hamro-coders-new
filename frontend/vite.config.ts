import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';
import path from 'path';

dotenv.config();
export default defineConfig({
  plugins: [react()],
 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Animations': path.resolve(__dirname, './src/animations'),
      '@Assets': path.resolve(__dirname, './src/assets'),
      '@Components': path.resolve(__dirname, './src/components'),
      '@Validations': path.resolve(__dirname, './src/validations'),
      '@Hooks': path.resolve(__dirname, './src/hooks'),
      '@Store': path.resolve(__dirname, './src/store'),
      '@Views': path.resolve(__dirname, './src/views'),
      '@Services': path.resolve(__dirname, './src/services'),
      '@Utils': path.resolve(__dirname, './src/utils'),
      '@Types': path.resolve(__dirname, './src/types'),
      '@Constants': path.resolve(__dirname, './src/constants'),
      '@Routes': path.resolve(__dirname, './src/routes'),
    },
  },
  define: {
    'process.env': {
      BASE_URL: process.env.BASE_URL,
      API_URL_V1: process.env.API_URL_V1,
      SITE_NAME: process.env.SITE_NAME,
      FAST_API: process.env.FAST_API,
    },
  },
  server: {
    open: false,
    host: '0.0.0.0',
    port: 3030,
  },
});
