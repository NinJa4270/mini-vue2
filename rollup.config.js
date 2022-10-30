import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
    // input: './src/index.ts',
    input: './src/platforms/web/entry-runtime.ts',
    output: [
        {
            format: 'cjs',
            file: 'dist/mini-vue2.cjs.js'
        },
        {
            format: 'es',
            file: 'dist/mini-vue2.esm.js'
        },
    ],
    plugins: [
        nodeResolve(),
        typescript()
    ]
}