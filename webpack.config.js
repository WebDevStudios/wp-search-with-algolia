const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "algolia.bundle.js"
	},
	module: {
		rules: [{ test: /\.css$/, use: "css-loader" }]
	},
	plugins: [new CleanWebpackPlugin()],
	watchOptions: {
		aggregateTimeout: 300,
		ignored: /node_modules/
	}
};
