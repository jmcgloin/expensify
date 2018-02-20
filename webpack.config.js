const path = require('path');

module.exports = {
	entry: "./src/app.js",

	output: {
		path: path.join(__dirname, 'public'),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /(\.test)?\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					
				}
			}
		]
	},
	devtool: 'cheap-module-eval-source-map',

	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		port: 3300,
		historyApiFallback: true
	}
}

