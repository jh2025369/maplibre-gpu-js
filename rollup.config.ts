import fs from 'fs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import {plugins, watchStagingPlugin} from './build/rollup_plugins';
import banner from './build/banner';
import {RollupOptions} from 'rollup';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

const {BUILD} = process.env;
const production = BUILD === 'production';
const outputFile = production ? 'dist/maplibre-gpu.js' : 'dist/maplibre-gpu-dev.js';

const isWatchMode = process.argv.includes('--watch');

const config: RollupOptions[] = [{
    // Before rollup you should run build-tsc to transpile from typescript to javascript (except when running rollup in watch mode)
    // Rollup will use code splitting to bundle GL JS into three "chunks":
    // - staging/maplibregpu/index.js: the main module, plus all its dependencies not shared by the worker module
    // - staging/maplibregpu/worker.js: the worker module, plus all dependencies not shared by the main module
    // - staging/maplibregpu/shared.js: the set of modules that are dependencies of both the main module and the worker module
    //
    // This is also where we do all of our source transformations using the plugins.
    input: ['src/index.ts', 'src/source/worker.ts'],
    output: {
        dir: 'staging/maplibregpu',
        format: 'amd',
        sourcemap: 'inline',
        indent: false,
        chunkFileNames: 'shared.js',
        amd: {
            autoId: true,
        },
        minifyInternalExports: production
    },
    onwarn: (message) => {
        console.error(message);
        throw message;
    },
    treeshake: production,
    plugins: plugins(production)
}, {
    // Next, bundle together the three "chunks" produced in the previous pass
    // into a single, final bundle. See rollup/bundle_prelude.js and
    // rollup/maplibregpu.js for details.
    input: 'build/rollup/maplibregpu.js',
    output: {
        name: 'maplibregpu',
        file: outputFile,
        format: 'umd',
        sourcemap: true,
        indent: false,
        intro: fs.readFileSync('build/rollup/bundle_prelude.js', 'utf8'),
        banner
    },
    watch: {
        // give the staging chunks a chance to finish before rebuilding the dev build
        buildDelay: 1000
    },
    treeshake: false,
    plugins: [
        // Ingest the sourcemaps produced in the first step of the build.
        // This is the only reason we use Rollup for this second pass
        sourcemaps(),
        // When running in development watch mode, tell rollup explicitly to watch
        // for changes to the staging chunks built by the previous step. Otherwise
        // only they get built, but not the merged dev build js
        ...production ? [] : [watchStagingPlugin],
        ...isWatchMode ? [] : [
            typescript({
                declaration: true,
                declarationDir: 'dist/types/'
            }),
            copy({
                targets: [
                    {
                        src: 'package.json',
                        dest: 'dist'
                    }
                ]
            })
        ]
    ],
}];

export default config;
