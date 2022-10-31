var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

function resolve (dir) {
	return path.join(__dirname, "..", dir);
}

module.exports = function() {
	return {
		context: path.resolve(__dirname, "../app"), //entry and module.rules.loader resolved relative to this dir
		entry: {
			// "react-hot-loader/patch",
			// "webpack-dev-server/client?http://localhost:8080", // <-enables websocket connection
			// "webpack/hot/only-dev-server", //<- to perform HMR in the browser
			app: "./index.js",
			//vendor: ["react", "react-dom", "react-router"]
		},
		output: {
			path: path.resolve(__dirname, "../dist"),
			filename: "[name].[hash].js",
			publicPath: "./", //specifies the public URL of the output directory, should be the same as devServer.publicPath
			sourceMapFilename: "[name].map"
		},
		resolve: {
			extensions: [" ", ".js", ".jsx", "vue", ".json"],
			modules: ["node_modules", path.resolve(__dirname, "../app")],
			alias: {
				"vue$": "vue/dist/vue.esm.js",
				"@": resolve("app"),
			}
		},
		devtool: "inline-source-map",
		module: {
			loaders: [
				{
					test: /\.vue$/,
					loader: "vue-loader",
					options: {
						transformToRequire: {
							video: ["src", "poster"],
							source: "src",
							img: "src",
							image: "xlink:href"
						}
					}
				},
				{
					test: /\.js$/,
					exclude: /node_modules|vendor/,
					loader: "babel-loader",
					query: {
						cacheDirectory: true,
					},
				},
				{
					test: /\.css$/,
					exclude: /node_modules|vendor/,
					use: [
						"style-loader",
						"css-loader",
					],
				},
				{
					test: /\.(png|PNG|jpg|gif|glb)$/,
					//exclude: /node_modules|vendor/,
					loader: "url-loader?limit=250000000000"
				}
			],
		},

		plugins: [
			//new VueLoaderPlugin(),

			/**
			 * HtmlWebpackPlugin will make sure out JavaScript files are being called
			 * from within our index.html
			 */
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "../www/index.html"),
				filename: "index.html",
				inject: "body",
				favicon: path.resolve(__dirname, "../www/favicon.ico"),
				environment: process.env.NODE_ENV
			})
		],
	};
};
