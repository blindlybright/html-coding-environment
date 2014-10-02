var config     = require('../../config').gulp,
	src        = config.js.src,
	dest       = config.js.dest,
	gulp       = require('gulp'),
	//gutil      = require('gulp-util'),
	jshint     = require('gulp-jshint')/*,
	debug = require('gulp-debug')*/;

function task() {
	gulp.src(['gulpfile.js', dest + '/*[^.min].js'])
		//.pipe(debug())
		.pipe(jshint())
		.pipe(jshint.reporter('default'));

}
module.exports = task;
