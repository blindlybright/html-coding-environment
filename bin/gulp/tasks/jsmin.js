var config = require('../../config').gulp,
	src    = config.js.src,
	dest   = config.js.dest,
	gulp   = require('gulp'),
	jsmin  = require('gulp-jsmin'),
	rename = require('gulp-rename'),
	debug  = require('gulp-debug');

function task() {
	gulp.src([
			dest + '/*.js',
			'!' + dest + '/*.min.js'
		])
	 	.pipe(debug())
		.pipe(jsmin())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest(dest));
}
module.exports = task;
