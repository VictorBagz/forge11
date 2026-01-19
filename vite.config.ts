import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration for UniStay Uganda
 * Implements extreme code splitting and high-performance minification.
 */
export default defineConfig({
  plugins: [react()], // THIS IS CRITICAL - handles .tsx files
  
  server: {
    cors: true,
    port: 5173,
    strictPort: false,
  },
  
  build: {
    minify: 'esbuild',
    cssMinify: true,
    target: 'esnext',
    sourcemap: false,
    
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('components/features/hostels')) {
            return 'feature-hostels';
          }
          if (id.includes('components/features/CommunityHub')) {
            return 'feature-community';
          }
          if (id.includes('components/features/StudentSpotlight')) {
            return 'feature-spotlight';
          }
          if (id.includes('components/features/ContactForm')) {
            return 'feature-contact';
          }
          if (id.includes('components/ui')) {
            return 'shared-ui';
          }
        },
      },
    },
    
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
  },
  
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
  },
});