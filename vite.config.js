import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins:[

  ],
  build: {
    lib: {
      entry: 'src/index.js',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/,
      output: {
        dir:"dist/",
      }
    }
  }
})
