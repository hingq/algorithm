import { fileURLToPath, URL } from 'node:url'
import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import Inspect from 'vite-plugin-inspect'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      imports:['vue','vue-router'] , //自动引入相关函数
    }),

    Components({
      resolvers: [
        ElementPlusResolver(), //自动导入组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
      
    }),
    
    Icons({
      autoInstall: true,
      compiler:'vue3'
    }),
    // Inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
