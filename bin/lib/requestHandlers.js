var fs   = require("fs-extra"),
	url  = require("url"),
	path = require("path"),
	clients = {},
	config = require("../config"),
	fileLPDate = config.tmp.timeUpdate;

function parseHref(str) {
	var query = url.parse(str).query || "",
		gets = query.split("&"),
		getArr = {};

	gets.forEach(function(v){
		var g = v.split("=");
		getArr[g[0]] = g[1];
	});

	return getArr;
}

function objForEach(obj, fn) {
	for (i in obj) {
		if (obj.hasOwnProperty(i)) {
			fn(obj[i], i);
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

function refresh(req, res) {
	console.log("Request handler 'refresh' was called.");

	checkForRefreshing();

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("refresh is done: " + objLength(clients) + " pages for polling");
	res.end();
}

function timeUpdate(req, res) {
	console.log("Request handler 'timeUpdate' was called.");

	res.on("close", function(){
		delete clients[url.parse(req.url).href];
	});
	res.on("finish", function(){
		delete clients[url.parse(req.url).href];
	});

	clients[url.parse(req.url).href] = res;
}

function lookpoll(req, res) {
	console.log("Request handler 'lookpoll' was called.");
	console.log(clients);
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("");
	res.end();
}

exports.refresh    = refresh;
exports.timeUpdate = timeUpdate;
exports.lookpoll   = lookpoll;
