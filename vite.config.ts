import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://192.168.31.230:8880', // 以/api开头的请求都会被代理到这里 并且在代理时会将/api的前缀移除
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  plugins: [tailwindcss(), vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
})
