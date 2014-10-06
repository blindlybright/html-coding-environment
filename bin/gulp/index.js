// todo: find a way to pass here server module object

var server = require("../lib/modules/server"),
	gulp   = require('gulp'),
	fs     = require('fs-extra'),
	req    = require('request'),
	config = require('../config'),
	serverHost = config.server.host,
	serverPort = config.server.port,
	serverRefreshUrl = [
		"http://",
		serverHost ? serverHost : "localhost",
		serverPort ? ":" + serverPort : "",
		"/refresh"
	].join("");

module.exports = function(tasks) {
    tasks.forEach(function(task) {
    	var name = task.name,
    		target = task.watchTarget;

        gulp.task(name, function() {
        	var gulpchain = require('./tasks/' + name)();

        	if (!!gulpchain) {
        		gulpchain.on("end", function(){
			        if (target) {
			 			server.refreshPolldate();

			 			//if (server.checkStarted()) {
						req.get(serverRefreshUrl);
			 			//}
					}
	        	});
        	}
        });

        if (target) {
			gulp.task('watch:' + name, function() {
			 	gulp.watch(target, function() {
			 		gulp.start(name);
			 	});
			});
        }
    });

    return gulp;
};
