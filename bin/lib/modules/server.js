var config = require("../../config"),
    http   = require("http"),
    url    = require("url"),
    fs     = require("fs-extra"),
    host   = config.server.host,
    port   = config.server.port,
    fileLPDate = config.tmp.timeUpdate,
    isServerStarted = false;

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");
    route(handle, pathname, request, response);
  }

  function onExit(exitCode) {
    console.log('Shutting down server...');

    httpServer.close(function(){
      process.exit(exitCode);
      isServerStarted = false;
    });
  }

  process.on('SIGTERM', onExit);
  process.on('SIGINT', onExit);
  process.on('SIGQUIT', onExit);

  var httpServer = http.createServer(onRequest);
  httpServer.listen(port, host);
  isServerStarted = true;

  console.log("Server has started on http://" + host + ":" + port + ".");

  return httpServer;
}
 
function refreshPolldate() {
	console.log("writing timeUpdate file: " + fileLPDate);
	fs.outputFileSync(fileLPDate, new Date().getTime());
}

function checkPolldateExists() {
	var isFileLPExists = fs.existsSync(fileLPDate);
	if (!isFileLPExists) {
		refreshPolldate();
	}
}

function checkStarted() {
  console.log("isServerStarted", isServerStarted);
  return isServerStarted;
}

exports.start = start;

exports.refreshPolldate = refreshPolldate;
exports.checkPolldateExists = checkPolldateExists;
exports.isStarted = checkStarted;
