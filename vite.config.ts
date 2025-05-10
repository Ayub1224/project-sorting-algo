import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['@headlessui/react', '@heroicons/react'],
          // Add more vendor chunks as needed
        },
      },
    },
    // Enable minification and source maps
    minify: 'terser',
    sourcemap: true,
  },
})