//todo относительные шрифты
//todo доработать систему деплоя на ghp
//todo ui-kit
//todo сетку подключить
//todo перенести некоторые компоненты с царя
//todo привести в порядок gulpfile
//todo дописать --verbose
//todo описать команды в readme
//todo инлайн-svg
//todo modernizer

const gulp = require('gulp');
const path = require('path');
const pug = require('gulp-pug');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const watch = require('gulp-watch');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');
const compass = require('gulp-compass');
const sourcemap = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cssmin = require('gulp-minify-css');
const rimraf = require('rimraf');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const createWebpackConfig = require('./createWebpackConfig.js');
const lite = require('lite-server');

const config = {
	options: {
		production: Boolean(argv['production']),
		minifyHtml: Boolean(argv['minify-html']),
		deployToGitHub: Boolean(argv['deploy-to-github']),
		verbose: Boolean(argv['verbose'])
	},
	paths: {
		cache: './cache',
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
				deployToGitHubPages: config.options['deployToGitHub']
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
			sourcemap: config.options.production,
			comments: config.options.production,
			// require: ['sass-globbing']
		}))
		.pipe(prefixer())
		.pipe(cssmin())
		.pipe(gulp.dest(config.paths.dist.styles));

	gulp.src(vendorStyles)
		.pipe(compass({
			css: config.paths.dist.styles,
			sass: config.paths.src.styles,
			image: config.paths.src.images,
			sourcemap: config.options.production,
			comments: config.options.production,
			// require: ['sass-globbing']
		}))
		.pipe(cssmin())
		.pipe(gulp.dest(config.paths.dist.styles));
});

gulp.task('build:js', function () {
	const mainJs = path.resolve(__dirname, path.join(config.paths.src.js, 'main.js'));
	const vendorJs = path.resolve(__dirname, path.join(config.paths.src.js, 'vendor.js'));

	const appConfig = createWebpackConfig({
		production: config.options.production,
		cache: config.paths.cache,
		entry: mainJs,
		output: {
			path: path.resolve(config.paths.dist.js),
			filename: 'main.bundle.js',
			pathinfo: !config.options.production
		},
	});

	const vendorConfig = createWebpackConfig({
		production: config.options.production,
		cache: config.paths.cache,
		entry: vendorJs,
		output: {
			path: path.resolve(config.paths.dist.js),
			filename: 'vendor.bundle.js',
			pathinfo: !config.options.production
		},
	});

	return gulp.src(mainJs)
		.pipe(webpackStream({
			config: [appConfig, vendorConfig]
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
