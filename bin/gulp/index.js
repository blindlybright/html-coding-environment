var server = require("../lib/modules/server");
var gulp   = require('gulp'),
	fs     = require('fs-extra'),
	req    = require('request'),
	config = require('../config'),
	fileLPDate = config.tmp.longpoll;

module.exports = function(tasks) {
    tasks.forEach(function(task) {
        gulp.task(task.name, require('./tasks/' + task.name));

        if (task.watchTarget) {
			gulp.task('watch:' + task.name, function() {
			 	gulp.watch(task.watchTarget, function() {
			 		gulp.start(task.name, function() {
			 			server.refreshPolldate();

						req.get("http://localhost:8000/refresh");
			 		});
			 	});
			});
        }
    });
    return gulp;
};
