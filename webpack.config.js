const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	mode: 'development',
	devServer: {
		historyApiFallback: true,
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		}, {
			test: /\.html$/,
			use: [{
				loader: "html-loader",
				options: {
					minimize: true
				}
			}]
		}, {
			test: /(\.css|\.scss|\.sass)$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'sass-loader'
			}]
		}]
	},
	plugins: [
		new HtmlWebPackPlugin({ // Create HTML file that includes references to bundled CSS and JS.
			template: 'src/index.ejs',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			inject: true
		}),
		new MiniCssExtractPlugin({
			filename: "./style/[name].css",
			chunkFilename: "./style/[id].css"
		})
	]
};