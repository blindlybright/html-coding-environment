var gulp   = require('gulp'),
	debug  = require('gulp-debug'),
	gutil  = require('gulp-util'),
	jade   = require('gulp-jade');

function task(filesPaths, dest, filename) {
	var locals = {},
		j = jade({
			locals:locals
		}).on('error', gutil.log);

	return gulp.src(filesPaths)
		//.pipe(debug())
		.pipe(j)
		//.pipe(debug())
		.pipe(gulp.dest(dest));
};

module.exports = task;
