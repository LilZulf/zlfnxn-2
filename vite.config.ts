import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'

// Content Collections owns a separate Chokidar watcher. Polling avoids EMFILE
// failures in constrained development environments while preserving live reload.
process.env.CHOKIDAR_USEPOLLING ??= 'true'
process.env.CHOKIDAR_INTERVAL ??= '1000'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  plugins: [
    // Generated collection modules are committed in `.content-collections/generated`.
    // Keep its Vite alias, but skip the generator during startup: it can hang on
    // this mounted development filesystem.
    contentCollections({ isEnabled: () => false }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
