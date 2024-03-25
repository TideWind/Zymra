import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    host: '0.0.0.0',
    port: 801,
    // 是否开启 https
    https: false,
    cors: true, // 允许跨域
    proxy: {
      // 带选项写法：http://localhost:5173/api/bar -> http://localhost:3000/bar
      '/api': {
        target: 'http://43.143.242.161:5050/api',
        changeOrigin: true,//是否跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 非必要配置项, /api 在真正发送网络请求时, 会被替换掉
      },
      '/banner': {
        target: 'https://zymra-1300854668.cos.ap-beijing.myqcloud.com',
        changeOrigin: true,//是否跨域
        rewrite: (path) => path.replace(/^\/banner/, ''), // 非必要配置项, /api 在真正发送网络请求时, 会被替换掉
      }
    },
    keepAlive: true,
    keepAliveTimeout: 600000 // 600秒后关闭Keep-Alive连接
  }
})
