var config     = require('../../config').gulp,
	//src        = config.js.src,
	pluginsrc  = config.js.pluginsrc,
	dest       = config.js.dest,
	gulp       = require('gulp'),
	//gutil      = require('gulp-util'),
	uglify     = require('gulp-uglifyjs')
	//, debug = require('gulp-debug')
	;

function task() {
	return gulp.src([
			pluginsrc + '/plugins.js',
			pluginsrc + '/*.min.js',
			'!'+ pluginsrc + '/jquery*.js',
			'!'+ pluginsrc + '/modernizr*.js'
		])
		//.pipe(debug())
		.pipe(uglify('plugins.js', {
			outSourceMap:false
		}))
		.pipe(gulp.dest(dest));
}
module.exports = task;
