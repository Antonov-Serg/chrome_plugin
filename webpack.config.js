const path = require('path');

module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'build', 'js'),
		filename: 'index.js',
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	performance: {
		hints: false
	},
	mode: 'development'
};