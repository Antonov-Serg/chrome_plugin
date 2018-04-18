const path = require('path');

module.exports = {
	entry: {
		background: './index.js',
		content: './content.js',
	},
	output: {
		path: path.resolve(__dirname, 'build', 'js'),
		filename: '[name].js',
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