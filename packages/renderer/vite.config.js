/* eslint-env node */

import { join } from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import { chrome } from '../../.electron-vendors.cache.json'
const PACKAGE_ROOT = __dirname

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '~/': `${join(PACKAGE_ROOT, 'src')}/`,
    },
  },
  plugins: [vue(
    { reactivityTransform: true },
  ),
  // https://github.com/hannoeru/vite-plugin-pages
  Pages({
    extensions: ['vue'],
  }),

  // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
  Layouts(),

  // https://github.com/antfu/unplugin-auto-import
  AutoImport({
    imports: [
      'vue',
      'vue-router',
      'vue-i18n',
      'vue/macros',
      '@vueuse/head',
      '@vueuse/core',
    ],
    dts: 'src/auto-imports.d.ts',
  }),

  // https://github.com/antfu/unplugin-vue-components
  Components({
    // allow auto load markdown components under `./src/components/`
    extensions: ['vue'],
    // allow auto import and register components used in markdown
    include: [/\.vue$/, /\.vue\?vue/],
    dts: 'src/components.d.ts',
  }),

  // https://github.com/antfu/unocss
  // see unocss.config.ts for config
  Unocss(),
  // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
  VueI18n({
    runtimeOnly: true,
    compositionOnly: true,
    include: [join(__dirname, 'locales/**')],
  }),

  // https://github.com/antfu/vite-plugin-inspect
  // Visit http://localhost:3333/__inspect/ to see the inspector
  Inspect(),
  ],

  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
      external: [
        ...builtinModules.flatMap(p => [p, `node:${p}`]),
      ],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  test: {
    environment: 'happy-dom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },
})
