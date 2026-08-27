import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the build works from any GitHub Pages path
  // (a project repo's /<name>/ subpath, or a user-page root) unchanged.
  base: './',
})
