import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    host: '0.0.0.0',
    port: 801,
    // �Ƿ��� https
    https: false,
    cors: true, // �������
    proxy: {
      // ��ѡ��д����http://localhost:5173/api/bar -> http://localhost:3000/bar
      '/api': {
        target: 'http://43.143.242.161:5050/api',
        changeOrigin: true,//�Ƿ����
        rewrite: (path) => path.replace(/^\/api/, ''), // �Ǳ�Ҫ������, /api ������������������ʱ, �ᱻ�滻��
      },
      '/banner': {
        target: 'https://zymra-1300854668.cos.ap-beijing.myqcloud.com',
        changeOrigin: true,//�Ƿ����
        rewrite: (path) => path.replace(/^\/banner/, ''), // �Ǳ�Ҫ������, /api ������������������ʱ, �ᱻ�滻��
      }
    }
  }
})
