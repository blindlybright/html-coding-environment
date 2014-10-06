var server          = require("./modules/server");
var router          = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/tmp/timeupdate"]   = requestHandlers.timeUpdate;
handle["/refresh"]          = requestHandlers.refresh;
handle["/lookpoll"]         = requestHandlers.lookpoll;

var httpServer = server.start(router.route, handle);
