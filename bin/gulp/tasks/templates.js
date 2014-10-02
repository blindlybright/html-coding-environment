var config = require('../../config').gulp,
	src    = config.templates.src,
	dest   = config.templates.dest,
	gulp   = require('gulp'),
	// debug  = require('gulp-debug'),
	jade   = require('gulp-jade');

function task() {
	var locals = {},
		j = jade({
			locals:locals
		});

	gulp.src(src + '/*.jade')
		.pipe(j)
		//.pipe(debug())
		.pipe(gulp.dest(dest));
};

module.exports = task;