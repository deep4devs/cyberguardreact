import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
  },
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'buffer'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        {
          name: 'buffer',
          setup(build) {
            build.onResolve({ filter: /^buffer$/ }, () => ({
              path: require.resolve('buffer/'),
            }))
          },
        },
      ],
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'buffer': 'buffer'
    },
    fallback: {
      buffer: require.resolve('buffer/')
    }
  }
})
