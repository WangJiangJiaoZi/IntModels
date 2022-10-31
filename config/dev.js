const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./base.js");
const path = require("path");

module.exports = function(env) {
	return webpackMerge(commonConfig(), {
		devServer: {
			// hot: true, //<-- enables HMR in webpack-dev-server and in libs running in the browser
			contentBase: path.resolve(__dirname, "../www"),
			publicPath: "/", // the bundle file will be availble under this folder
			historyApiFallback: { disableDotRule: true },
			stats: { colors: true }, // Pretty colors in console
			port: 3000,
			host: '0.0.0.0'
				// watchContentBase: true
		},

		plugins: [
			//new VueLoaderPlugin(),
			/*      */
			// used to split out our sepcified vendor script
			new webpack.optimize.CommonsChunkPlugin({
				name: "vendor",
				minChunks: Infinity,
				filename: "[name].[hash].js",
			}),
		]

	});
};
