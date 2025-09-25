import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将Vue生态系统库分割到一个chunk
          vue: ['vue', 'vue-router'],
          // 将图表库分割
          charts: ['echarts', 'vue-echarts'],
          // 将动画库分割
          animation: ['vue3-lottie'],
          // 将其他第三方库分割
          vendor: ['axios', 'xlsx']
        }
      }
    }
  }
})
