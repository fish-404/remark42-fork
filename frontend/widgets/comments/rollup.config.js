import fs from 'fs'
import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-css-only'
import url from '@rollup/plugin-url'
import serve from 'rollup-plugin-dev'

const production = !process.env.ROLLUP_WATCH

export default {
	input: production ? 'src/index.ts' : 'src/dev.ts',
	output: {
		sourcemap: true,
		format: 'esm',
		name: 'app',
		dir: 'public/build',
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production, postcss: true }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			},
		}),
		url({
			publicPath: 'build/',
			limit: 0,
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'comments.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),
		typescript({
			sourceMap: true,
			inlineSources: !production,
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production &&
			livereload({
				watch: 'public',
				https: {
					key: fs.readFileSync('./certs/localhost-key.pem'),
					cert: fs.readFileSync('./certs/localhost.pem'),
				},
			}),
		!production &&
			serve({
				port: '8080',
				dirs: ['public'],
				server: {
					https: {
						key: fs.readFileSync('./certs/localhost-key.pem'),
						cert: fs.readFileSync('./certs/localhost.pem'),
					},
				},
				proxy: [
					{ from: '/api/*', to: 'https://demo.remark42.com' },
					{ from: '/auth/*', to: 'https://demo.remark42.com' },
				],
			}),
		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
}
