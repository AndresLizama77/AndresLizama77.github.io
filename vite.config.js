import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/'  // Como es tu página principal (DaRaci-7.github.io), usa '/'
})
