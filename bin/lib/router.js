var server = require("./modules/server"),
	fs     = require("fs-extra"),
	path   = require("path"),
	mime   = require("mime"),
	config = require("../config"),
	mimeCustomTypes = {
/*		"text/plain":["txt"],
		"text/x-markdown":["md"],
		"text/html":["htm", "html"],
		"application/xml":["xml"]

		"text/css":["css"],
		
		"application/javascript":["js"],
		"application/json":["json"],
		"text/x-component":["htc"],
		
		"image/gif":["gif"],
		"image/jpeg":["jpg","jpeg"],
		"image/png":["png"],
		"image/x-icon":["ico"],
		
		"image/svg+xml":["svg"],
		"application/font-woff":["woff"],
		"application/x-font-ttf":["ttf"],
		"font/opentype":["otf"],
		"application/vnd.ms-fontobject":["eot"]
*/	},
	doc404Path     = config.server.basePath + "/404.html";

mime.default_type = "text/html";
mime.define(mimeCustomTypes);

function route(handle, pathname, request, response) {
	var filePath,
		status = 200,
		mimeType,
		body;
	console.log("About to route a request for " + pathname);

	if (pathname === "/") {
		pathname = "/index.html";
	}

	if (typeof handle[pathname] === 'function') {
		handle[pathname](request, response);

	} else {
		if (pathname == "/index.html") {
			server.checkPolldateExists();
		}

		filePath = path.resolve(config.server.basePath + pathname);
		mimeType = mime.lookup(filePath);

		if (!fs.existsSync(filePath)) {
			console.log("No request handler found for " + pathname);
			status = 404;
			filePath = doc404Path;
		}
		body = fs.readFileSync(filePath);

		response.writeHead(status, {
			"Content-Length": body.length,
			"Content-Type": mimeType
		});
		response.write(body);
		response.end();
	}
}

exports.route = route;
