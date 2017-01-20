import babel from 'rollup-plugin-babel';

export default {
	entry: './src/index.js',
	plugins: [
		babel({
			exclude: 'node_modules/**'
		})
	],
	targets: [
		{
			dest: './dist/faded-header.js',
			format: 'es'
		},
		{
			dest: './dist/faded-header.cjs.js',
			format: 'cjs'
		}
	],
	preferConst: true
};
