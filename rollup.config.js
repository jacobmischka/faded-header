import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: './src/index.js',
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		commonjs(),
		nodeResolve()
	],
	targets: [
		{
			dest: './dist/faded-header.js',
			format: 'es'
		},
		{
			dest: './dist/faded-header.cjs.js',
			format: 'cjs'
		},
		{
			dest: './dist/faded-header.umd.js',
			format: 'umd'
		}
	],
	moduleName: 'fadedHeader',
	preferConst: true
};
