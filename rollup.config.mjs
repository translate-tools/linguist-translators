import { glob } from 'glob';

import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default glob.sync('src/translators/*.ts').map((filename) => ({
	input: filename,
	output: {
		dir: 'translators/generated',
		format: 'es',
	},
	treeshake: false,
	plugins: [
		commonjs(),
		typescript({ module: 'esnext' }),
		nodeResolve({
			browser: true,
		}),
	],
}));
