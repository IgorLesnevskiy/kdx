const webpack = require('webpack');

module.exports = function createWebpackConfig(_options) {
	let config;
	const options = _options || {};

	config = {
		// context: options.context,
		entry: options.entry,
		output: options.output,
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
		plugins: [
			new webpack.ProvidePlugin({}),
			// Хак, необходимый для корректной работы конструкции catch в промисах
			new webpack.DefinePlugin({
				'\.catch': '["catch"]',
			}),
		]
	};

	return config;
};