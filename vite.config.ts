/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['vitest-setup.ts'],
    },
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:8080',
        },
    },
    build: {
        outDir: 'build',
    },
})
