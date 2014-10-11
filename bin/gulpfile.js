// jslint node: true
// "use strict";

var config = require("./config").gulp,
	tasksToLoad = [
		{name:'less', watch: true},
		{name:'sass', watch: true},
		{name:'images', watch: true},
		{name:'templates', watch: true},
		{name:'plugins', watch: true},
		{name:'jsmin'},
		//{name:'csscompile'},
		{name:'uncss'},//, depends:["csscompile"]},
		{name:'uglify'},
		{name:'uglifyapp', depends:['uglify']},
		{name:'jshint'},
		{name:'pluglist'}  // exp
		//, {name:'tasklist'}  // called inside
	],
	gulp = require('./gulp')(tasksToLoad),
	taskListing   = require('gulp-task-listing');

gulp.task('help', taskListing);
gulp.task('helpf', taskListing.withFilters(/:/));
gulp.task('watch',        ['watch:templates', 'watch:less', 'watch:images', 'watch:plugins']);
gulp.task('test',         ['jshint']);
gulp.task('compile',      ['templates', 'uncss', 'uglifyapp']);
gulp.task('compile-full', ['compile', 'images']);
gulp.task('default',      ['watch']);
