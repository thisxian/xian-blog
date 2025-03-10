import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  plugins: [
    vue(),
    // 自动导入vue、vue-router、element
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    port: 3000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    host: '0.0.0.0', // 解除局域网访问限制
  },
  // 配置路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // css预处理器
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: `
          @import "@/assets/style/xian.less"; 
          @import "@/assets/style/variables.less"; 
        `,
      },
    },
  },
})
