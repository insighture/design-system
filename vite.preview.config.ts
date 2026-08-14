import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev/showcase app. It imports from `src` directly so edits hot-reload without
// a package rebuild — the published entry point is still `src/index.ts`.
export default defineConfig({
  root: 'preview',
  plugins: [react()],
  server: { port: 5273, open: false },
  build: { outDir: '../preview-dist', emptyOutDir: true },
});
