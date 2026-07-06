import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Set the base path to match the GitHub repository name.
  // This is required for GitHub Pages so it knows to serve assets from /DBMS_Intro/ 
  // instead of the root (/) which causes 404 errors.
  base: '/DBMS_Intro/',
  plugins: [react(), tailwindcss()],
})
