import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/files': 'http://localhost:8081', // Proxy requests starting with '/files' to your backend
      '/upload':'http://localhost:8081',
      '/delete' : 'http://localhost:8081',
      '/download' : 'http://localhost:8081'
    },
  },
});
