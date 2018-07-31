const gulp = require('gulp');
const pug = require('gulp-pug');
const gulpif = require('gulp-if');
const watch = require('gulp-watch');
const prefixer = require('gulp-autoprefixer');
const compass = require('gulp-compass');
const sass = require('gulp-sass');
const sourcemap = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-minify-css');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const postcss = require('gulp-postcss');
const url = require('postcss-url');
const path = require('path');
const argv = require('yargs').argv;
const runSequence = require('run-sequence');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const lite = require('lite-server');

const config = {
	options: {
		production: Boolean(argv['production']),
		minifyHtml: Boolean(argv['minify-html']),
		deploy: Boolean(argv['deploy'])
	},
	paths: {
		cache: './cache',
		deployRoot: '/kdx',
		src: {
			root: './src',
			templates: './src/templates',
			js: './src/js',
			styles: './src/styles',
			fonts: './src/fonts',
			webFont: './src/fonts/webfont',
			webfontIcons: './src/webfont-icons',
			images: './src/images',
		},
		dist: {
			root: './dist',
			html: './dist',
			js: './dist/js',
			styles: './dist/css',
			fonts: './dist/fonts',
			images: './dist/images',
		}
	}
};

gulp.task('clean', cb => {
	rimraf(config.paths.dist.root, cb);
});

gulp.task('build:html', () => {
	gulp.src(path.join(config.paths.src.templates, 'pages/*.pug'))
		.pipe(pug({
			pretty: !config.options['minify-html'],
			locals: {
				deploy: config.options['deploy']
			}
		}))
		.pipe(gulp.dest(config.paths.dist.html));
});

gulp.task('build:styles', function () {
	const mainStyles = path.join(config.paths.src.styles, 'main.scss');
	const vendorStyles = path.join(config.paths.src.styles, 'vendor.scss');

	gulp.src(mainStyles)
		.pipe(compass({
			css: config.paths.dist.styles,
			sass: config.paths.src.styles,
			image: config.paths.src.images,
			sourcemap: false,
			comments: !config.options.production,
			// require: ['sass-globbing']
		}))
		.pipe(gulpif(!config.options.production, sourcemap.init()))
		.pipe(postcss([
			url({
				url: (asset, dir, options) => {
					// 			console.log(asset);
					if (config.options.deploy) {
						return path.join(config.paths.deployRoot, asset.url);
					} else {
						return asset.url;
					}
				}
			})
		]))
		.pipe(prefixer({
			browsers: ['> 1%', 'IE > 7']
		}))
		.pipe(cssmin())
		.pipe(gulpif(!config.options.production, sourcemap.write()))
		.pipe(gulp.dest(config.paths.dist.styles));

	gulp.src(vendorStyles)
		.pipe(compass({
			css: config.paths.dist.styles,
			sass: config.paths.src.styles,
			image: config.paths.src.images,
			sourcemap: !config.options.production,
			comments: !config.options.production,
			// require: ['sass-globbing']
		}))
		.pipe(cssmin())
		.pipe(gulp.dest(config.paths.dist.styles));
});

gulp.task('build:js', function () {
	const mainJs = path.resolve(__dirname, path.join(config.paths.src.js, 'main.js'));
	const vendorJs = path.resolve(__dirname, path.join(config.paths.src.js, 'vendor.js'));

	const wpConfig = {
		entry: {
			main: mainJs,
			vendor: vendorJs
		},
		output: {
			path: path.resolve(config.paths.dist.js),
			filename: '[name].bundle.js',
			pathinfo: !config.options.production
		},
		devtool: (config.options.production) ? false : 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: config.cache,
							presets: ['env']
						}
					}
				}
			]
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: Infinity
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				'window.$': 'jquery',
			}),
			// Хак, необходимый для корректной работы конструкции catch в промисах
			new webpack.DefinePlugin({
				'\.catch': '["catch"]',
				'production': config.options.production
			})
		]
	};

	if (config.options.production) {
		wpConfig.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: false,
				comments: false,
				compress: {
					warnings: false
				},
				exclude: [
					/\.min\.js/i
				],
				mangle: {
					except: ['$', 'exports', 'require']
				}
			})
		);
	}

	return gulp.src(mainJs)
		.pipe(webpackStream({
			config: [wpConfig]
		}, webpack))
		.pipe(gulp.dest(config.paths.dist.js));
});

gulp.task('build:webfont', function () {
	const webfontIconsPath = path.join(config.paths.src.webfontIcons, '*.svg');
	const webfontPath = config.paths.src.webFont;
	const webfontStylePath = path.join(config.paths.src.styles, 'start/webfont.scss');

	return gulp.src(webfontIconsPath)
		.pipe(iconfontCss({
			// путь для scss-файла
			targetPath: path.relative(webfontPath, webfontStylePath),
			// название шрифта
			fontName: 'webfont',
			// путь для сохраненного шрифта
			fontPath: webfontPath,
			// шаблон для scss-файла, с помощью которого будут использоваться иконки
			path: path.join(__dirname, 'src/utilities/webfont-template.scss')
		}))
		.pipe(iconfont({
			// имя шрифта
			fontName: 'webfont',
			// форматы шрифта
			formats: ['woff', 'woff2', 'svg'],
			normalize: true,
			centerHorizontally: true,
			timestamp: '12321',
			prependUnicode: true,
			fontHeight: 1001,
		}))
		.pipe(gulp.dest(config.paths.src.webFont));
});

gulp.task('build:fonts', function () {
	const fonts = path.join(config.paths.src.fonts, '**/*.*');

	return gulp.src(fonts)
		.pipe(gulp.dest(config.paths.dist.fonts));
});

gulp.task('build:images', function () {
	const imgPath = path.join(config.paths.src.images, '**/*.*');

	return gulp.src(imgPath)
		.pipe(gulpif(config.options.production, imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		})))
		.pipe(gulp.dest(config.paths.dist.images));
});

gulp.task('build', [], (cb) => {
	runSequence(
		['build:webfont'],
		['build:html', 'build:styles', 'build:js', 'build:fonts', 'build:images'],
		cb
	);
});

gulp.task('build:clean', ['clean'], function (done) {
	runSequence(
		['build'],
		done
	);
});

gulp.task('server', (cb) => {
	lite.server({}, () => cb());
});

gulp.task('watch', ['build:clean'], () => {
	runSequence(
		['server'],
		() => {
			watch([path.join(config.paths.src.js, '**/*.js')], function () {
				gulp.start('build:js');
			});

			watch([path.join(config.paths.src.templates, '**/*.pug')], function () {
				gulp.start('build:html');
			});

			watch([path.join(config.paths.src.styles, '**/*.scss')], function () {
				gulp.start('build:styles');
			});

			watch([path.join(config.paths.src.fonts, '**/*.*')], function () {
				gulp.start('build:fonts');
			});

			watch([path.join(config.paths.src.images, '**/*.*')], function () {
				gulp.start('build:images');
			});

			watch([path.join(config.paths.src.webfontIcons, '*.svg')], function () {
				gulp.start('build:webfont');
			});
		});
});

gulp.task('default', ['watch']);
