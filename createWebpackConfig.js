const webpack = require('webpack');

module.exports = function createWebpackConfig(_options) {
	let config;
	const options = _options || {};

	const plugins = [
		new webpack.ProvidePlugin({
			$: 'jquery',
			'window.jQuery': 'jquery',
			jQuery: 'jquery'
		}),
		// Хак, необходимый для корректной работы конструкции catch в промисах
		new webpack.DefinePlugin({
			'\.catch': '["catch"]',
		}),
	];

	// if (!options.production) {
	// 	plugins.push(new webpack.SourceMapDevToolPlugin({
	// 		filename: '[name].bundle.js.map',
	// 		exclude: ['vendor.js']
	// 	}));
	// }

	config = {
		// context: options.context,
		entry: options.entry,
		output: options.output,
		devtool: options.devtool,
		mode: options.production ? 'production' : 'development',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: options.cache,
							presets: ['env']
						}
					}
				},
			],
		},
		plugins: plugins
	};

	return config;
};