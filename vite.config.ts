import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ['@react-pdf-viewer/core'],
  },
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker.min.js': 'https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js',
    },
  },
  define: {
    'process.env': process.env,
    'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || '/'),
  },
});
