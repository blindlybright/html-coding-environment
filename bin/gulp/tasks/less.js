var config     = require('../../config').gulp,
	src        = config.less.src,
	dest       = config.css.src,
	gulp       = require('gulp'),
	gutil      = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps'),
	less       = require('gulp-less');

function task() {
	var l = less({}).on('error', gutil.log);

	return gulp.src(src + '/main.less')
		.pipe(sourcemaps.init())
		.pipe(l)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest));
}
module.exports = task;
