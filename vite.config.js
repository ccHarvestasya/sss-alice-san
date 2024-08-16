import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig((opt) => {
    return {
        root: 'src',
        build: {
            outDir: '../dist',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/index.ts'),
                    back: resolve(__dirname, 'src/back.ts'),
                    embed: resolve(__dirname, 'src/embed.ts'),
                },
                output: {
                    entryFileNames: '[name].js',
                },
            },
        },
    }
})

