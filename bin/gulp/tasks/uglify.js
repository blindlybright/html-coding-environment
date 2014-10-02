var config   = require('../../config').gulp,
	src      = config.js.dest,
	dest     = config.js.dest,
	gulp     = require('gulp'),
	uglify   = require('gulp-uglifyjs');

function task() {
	gulp.src([
			src + '/plugins.js',
			src + '/main.js',
			'!' + src + '/*.min.js',
		])
		.pipe(uglify('app.min.js', {
			outSourceMap:false
		}))
		.pipe(gulp.dest(dest));
}
module.exports = task;
