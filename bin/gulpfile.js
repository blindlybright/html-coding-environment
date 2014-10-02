// jslint node: true
// "use strict";

var gulp = require('./gulp')([
	//{name:'pluglist'},  // exp
    {name:'plugins', watchTarget:'../js/vendor/*.min.js'},
    {name:'jsmin'},
    {name:'jslint'},
    {name:'uglify'},
    {name:'csscompile'},
    {name:'less', watchTarget:"../src/less/**/*.less"},
    {name:'images', watchTarget:"../src/img/**/*"},
    {name:'templates', watchTarget:"../src/templates/**/*"}
]);

gulp.task('watch',        ['watch:templates', 'watch:less', 'watch:images', 'watch:plugins']);
gulp.task('test',         ['jslint']);
gulp.task('compile',      ['templates', 'csscompile', 'uglify']);
gulp.task('compile-full', ['compile', 'images']);
gulp.task('default',      ['watch']);
