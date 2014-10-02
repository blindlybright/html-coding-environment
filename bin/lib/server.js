var server          = require("./modules/server");
var router          = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/tmp/longpolldate"] = requestHandlers.longpoll;
handle["/refresh"]          = requestHandlers.refresh;

server.start(router.route, handle);
