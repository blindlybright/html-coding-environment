var gulp     = require('gulp'),
	changed  = require('gulp-changed'),
	debug    = require('gulp-debug'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush');

function task(filesPaths, dest, filename) {
	return gulp.src(filesPaths)
		.pipe(changed(dest))        // Ignore unchanged files
	    .pipe(imagemin({            // Optimize
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngcrush()]
		}))
		//.pipe(debug())
	    .pipe(gulp.dest(dest));
}
module.exports = task;
