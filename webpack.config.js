const path = require('path');

module.exports = {
	mode: 'development',
	entry: './js/src/wpalgolia.js',
	devtool: 'inline-source-maps',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'js/dist')
	}
}