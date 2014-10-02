var server = require("./modules/server");
var fs = require("fs-extra"),
	config = require("../config"),
	contentTypes = {
		"txt":"text/plain",
		"md":"text/x-markdown",
		"htm":"text/html",
		"html":"text/html",
		"xml":"application/xml",

		"css":"text/css",
		
		"js":"application/javascript",
		"json":"application/json",
		"htc":"text/x-component",
		
		"gif":"image/gif",
		"jpg":"image/jpeg",
		"jpeg":"image/jpeg",
		"png":"image/png",
		"ico":"image/x-icon",
		
		"svg":"image/svg+xml",
		"woff":"application/font-woff",
		"ttf":"application/x-font-ttf",
		"otf":"font/opentype",
		"eot":"application/vnd.ms-fontobject"
	},
	fileLPDate = config.tmp.longpoll; //__dirname + '/../../tmp/longpolldate';

function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);

	if (pathname === "/") {
		pathname = "/index.html";
	}

	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request);

	} else {
		if (pathname == "/index.html") {
			server.checkPolldateExists()
		}

		if (fs.existsSync(__dirname + "/../.." + pathname)) {
			var ext = pathname.split("?")[0];
			ext = pathname.split(".");
			if (ext.length > 1) {
				ext = ext[ext.length - 1];
			} else {
				ext = "txt";
			}
			if (!contentTypes.hasOwnProperty(ext)) {
				ext = "txt";
			}
			response.writeHead(200, {"Content-Type": contentTypes[ext]});
			response.write(fs.readFileSync(__dirname + "/../.." + pathname));
			response.end();
		} else {
			console.log("No request handler found for " + pathname);
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not found");
			response.end();
		}
	}
}

exports.route = route;
