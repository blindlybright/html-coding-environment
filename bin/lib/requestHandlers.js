var fs = require("fs-extra"),
	url = require("url"),
	clients = [],
	config = require("../config"),
	fileLPDate = config.tmp.longpoll; //__dirname + '/../../tmp/longpolldate';

function parseHref(ur) {
	var query = url.parse(ur).query || "",
		gets = query.split("&"),
		getArr = {};

	gets.forEach(function(v){
		var g = v.split("=");
		getArr[g[0]] = g[1];
	});
	return getArr;
}
function objForEach(obj, fn) {
	for (i in clients) {
		if (clients.hasOwnProperty(i)) {
			fn(clients[i], i);
		}
	}	
}
function objLength(obj) {
	var len = 0;
	objForEach(obj, function(){
		len++;
	});
	return len;
}
function checkForRefreshing() {
	var curServDate = fs.readFileSync(fileLPDate, 'utf8'),
		len = objLength(clients);

	console.log("checkForRefreshing(): %s objects totally, let's see what to refresh", len);

	objForEach(clients, function(res, i){
		var gets = parseHref(i);
		
		if (curServDate * 1 > gets.dt * 1) {
			console.log("checkForRefreshing(): refreshing %s page", i);

			res.writeHead(200, {"Content-Type": "text/html"});
			res.write("refreshing client");
			res.end();
		}
	});
}
function refresh(res, req) {
	console.log("Request handler 'refresh' was called.");

	checkForRefreshing();

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("refresh is done: " + objLength(clients) + " pages for polling");
	res.end();
}

function longpoll(res, req) {
	console.log("Request handler 'longpoll' was called.");

	(function(){
		res.on("close", function(){
			delete clients[url.parse(req.url).href];
		});
		res.on("finish", function(){
			delete clients[url.parse(req.url).href];
		});
	})();

	clients[req.url] = res;
}

exports.refresh   = refresh;
exports.longpoll  = longpoll;
