// jslint node: true
// "use strict";

var config = require("./config").gulp,
	tasksToLoad = [
		{name:'less', watch: true},
		{name:'images', watch: true},
		{name:'templates', watch: true},
		{name:'plugins', watch: true},
		{name:'jsmin'},
		{name:'csscompile'},
		{name:'uglify'},
		{name:'uglifyapp'},
		{name:'jshint'},
		{name:'pluglist'}  // exp
		//{name:'tasklist'} // called inside
	],
	gulp = require('./gulp')(tasksToLoad);

gulp.task('watch',        ['watch:templates', 'watch:less', 'watch:images', 'watch:plugins']);
gulp.task('test',         ['jslint']);
// gulp.task('jscompile',    ['uglify'], function(callback){
// 	//console.log(arguments[0].toString());
// 	gulp.start('uglifyapp', function(){
// 		console.log("25/ asdasdas");
// 		console.log(arguments);
// 	});//.on("end", callback);
// });
gulp.task('compile',      ['templates', 'csscompile', 'uglifyapp']);
gulp.task('compile-full', ['compile', 'images']);
gulp.task('default',      ['watch']);
