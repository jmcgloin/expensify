const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
	const isProduction = env === "production";
	return {
		entry: "./src/app.js",
		output: {
			path: path.join(__dirname, 'public/dist'),
			filename: "bundle.js"
		},
		module: {
			rules: [
				{
					test: /\.s?css$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							{ loader: "css-loader", options: { sourceMap: true } },
							{ loader: "sass-loader", options: { sourceMap: true } }
						]
					})
				},
				{
					test: /(\.test)?\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader'				
					}
				}
			]
		},
		plugins: [
			new ExtractTextPlugin("styles.css")
		],
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			port: 3300,
			historyApiFallback: true,
			publicPath: "/dist/"
		}
	};
};


