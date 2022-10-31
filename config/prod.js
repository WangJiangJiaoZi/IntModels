
var webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./base.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");




module.exports = function(env) {
	return webpackMerge(commonConfig(), {
		plugins: [
			/*      */
			// used to split out our sepcified vendor script
			new webpack.optimize.CommonsChunkPlugin({
				name: "vendor",
				minChunks: Infinity,
				filename: "[name].[hash].js",
			}),

			new webpack.DefinePlugin({
				"process.env": {
					"NODE_ENV": JSON.stringify("production")
				},
				PRODUCTION: JSON.stringify(false),
				VERSION: JSON.stringify("5fa3b9")
			}),
			/*			*/
			new UglifyJsPlugin({
				uglifyOptions: {
					cache: true,
					parallel: true,
					mangle: true,
					compress: {
						sequences: true,
						dead_code: true,
						conditionals: true,
						booleans: true,
						unused: true,
						if_return: true,
						join_vars: true,
						drop_console: true
					},
					comments: true
				}

			})

		]
	});
};
