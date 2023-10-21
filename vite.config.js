import {defineConfig} from "vite"
import { glob } from "glob";
import path from "path";
export default defineConfig({
    base: './',
    // assetsDir: 'src',
    outDir: 'public/js',
    // build: {
    //     analyze: false,
    //     minify: true,
    //     sourceMap: false,
    //     rollupOptions: {
    //     // input: {
    //     //     home: 'src/script/main.js',
    //     //     //   public: 'src/public.js',
    //     // },
    //     output: {
    //         // path: path.resolve(__dirname, 'public'),
    //         inlineDynamicImports: false,
    //         format: 'es',
    //         // entryFileNames: '[name].min.js',
    //         // chunkFileNames: '[name]-[hash].min.js'
    //     }
    // }
    // },
    root: path.join(__dirname, "src"),
    build: {
        outDir: path.join(__dirname, "public/js"),
        rollupOptions: {
            input: glob.sync(path.resolve(__dirname, "src", "*.js")),
        },
    },
});