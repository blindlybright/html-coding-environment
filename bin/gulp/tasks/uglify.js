var config   = require('../../config').gulp,
	src      = config.js.dest,
	dest     = config.js.dest,
	gulp     = require('gulp'),
	uglify   = require('gulp-uglify'),
	rename   = require('gulp-rename'),
	debug    = require('gulp-debug');

function task() {
	return gulp.src([
			src + '/*.js',
			'!' + src + '/*.min.js',
		])
		.pipe(uglify({
			outSourceMap:false
		}))
		.pipe(debug())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest(dest))
}
module.exports = task;
