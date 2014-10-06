var config     = require('../../config').gulp,
	src        = config.css.src,
	dest       = config.css.dest,
	gulp       = require('gulp'),
	//gutil      = require('gulp-util'),
	cleancss   = require('gulp-clean-css'),
	concat     = require('gulp-concat');

function task() {
	return gulp.src([
			src + "/normalize.css",
			//src + "/vendor/bxslider/jquery.bxslider.css",
			src + "/vendor/fancybox/jquery.fancybox.css",
			src + "/bp-begin.css",
			src + "/main.css",
			src + "/bp-tail.css",
		])
		.pipe(concat('app.min.css'))
		.pipe(cleancss({
			//keepBreaks:false,
			keepSpecialComments:0
		}))
		.pipe(gulp.dest(dest));
}
module.exports = task;
