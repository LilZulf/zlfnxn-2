import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        failOnError: true,
      },
    }),
    viteReact(),
  ],
})

export default config
