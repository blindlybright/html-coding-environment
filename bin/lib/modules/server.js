var config = require("../../config");
var http   = require("http");
var url    = require("url");
var fs     = require("fs-extra");
var port   = config.server.port;
var fileLPDate = config.tmp.longpoll;

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(port);
  console.log("Server has started on http://localhost:" + port + ".");
}

function refreshPolldate() {
	console.log("writing longpolldate file: " + fileLPDate);
	fs.outputFileSync(fileLPDate, new Date().getTime());
}
function checkPolldateExists() {
	var isFileLPExists = fs.existsSync(fileLPDate);
	if (!isFileLPExists) {
		refreshPolldate();
	}
}
exports.start = start;
exports.refreshPolldate = refreshPolldate;
exports.checkPolldateExists = checkPolldateExists;
