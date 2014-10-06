var config = require('../../config').gulp,
	src    = config.templates.src,
	dest   = config.templates.dest,
	gulp   = require('gulp'),
	//debug  = require('gulp-debug'),
	gutil  = require('gulp-util'),
	jade   = require('gulp-jade');

function task() {
	var locals = {},
		j = jade({
			locals:locals
		}).on('error', gutil.log);

	return gulp.src(src + '/*.jade')
		//.pipe(debug())
		.pipe(j)
		//.pipe(debug())
		.pipe(gulp.dest(dest));
};

module.exports = task;
