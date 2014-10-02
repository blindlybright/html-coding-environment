var config     = require('../../config').gulp,
	//src        = config.js.src,
	pluginsrc  = config.js.pluginsrc,
	dest       = config.js.dest,
	gulp       = require('gulp'),
	//gutil      = require('gulp-util'),
	uglify     = require('gulp-uglifyjs')
	//debug = require('gulp-debug')
	;

function task() {
	gulp.src([
			pluginsrc + '/plugins.js',
			pluginsrc + '/*.min.js',
			'!'+ pluginsrc + '/jquery-1.10.2.min.js',
			'!'+ pluginsrc + '/modernizr-2.6.2.min.js'
		])
		//.pipe(debug())
		.pipe(uglify('plugins.js', {
			outSourceMap:false
		}))
		.pipe(gulp.dest(dest));

}
module.exports = task;
