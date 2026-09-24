import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Drop legacy-syntax transforms; modern evergreen output is smaller.
    target: 'esnext',
    // The three.js chunk is intentionally large but only fetched after the
    // 3D canvases lazily mount, so no need to warn about it.
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React runtime goes FIRST so every later chunk (fiber/drei included)
          // shares it instead of bundling a duplicate copy of react-dom.
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/prop-types/") ||
            id.includes("node_modules/react-is/")
          ) {
            return "react";
          }
          if (id.includes("node_modules/framer-motion/")) {
            return "motion";
          }
          // Heavy 3D stack loaded only after the canvases lazily mount.
          if (
            id.includes("node_modules/three/") ||
            id.includes("node_modules/@react-three/")
          ) {
            return "three";
          }
        },
      },
    },
  },
})
