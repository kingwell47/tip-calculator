const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postCss = require('gulp-postcss');
const terser = require('gulp-terser');
const autoPrefixer = require('autoprefixer');
const babel = require('gulp-babel');

function compileScss() {
    return src('app/scss/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postCss([autoPrefixer()]))
    .pipe(dest('dist', { sourcemaps: '.' }));  
}

function jsTask() {
	return src('app/js/script.js', { sourcemaps: true })
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(terser())
		.pipe(dest('dist', { sourcemaps: '.' }));
}

function watchTask() {
    watch('app/scss/*.scss', compileScss);
    watch('app/js/script.js', jsTask);
}

exports.default = series(
    compileScss,
    jsTask,
    watchTask
);
