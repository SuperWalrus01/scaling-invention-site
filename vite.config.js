import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Assign by module path, not by package name. The object form let
        // Rollup hoist React into the recharts chunk, which put all 500 kB of
        // charting on the critical path for every visitor.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          if (
            id.includes('recharts') ||
            id.includes('victory-vendor') ||
            id.includes('/d3-')
          ) {
            return 'charts';
          }
          if (id.includes('framer-motion') || id.includes('@motionone')) {
            return 'motion';
          }
          if (id.includes('lucide-react')) return 'icons';
          if (
            id.includes('/react-dom/') ||
            id.includes('/react/') ||
            id.includes('/scheduler/')
          ) {
            return 'vendor';
          }
          return undefined;
        },
      },
    },
  },
})
