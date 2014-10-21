#!/usr/bin/env node
"use strict";
var colors = require("colors/safe"),
	config = require("./config"),
	conflibs = config.libs;

console.log(colors.green("libs installation [dummy]"));
for (var i in conflibs) {
	if (conflibs.hasOwnProperty(i)) {
		console.log(colors.yellow("*") + colors.white(" %s ")+colors.grey("[from: %s, to: %s]"), i, conflibs[i].repo, conflibs[i].dest);
	}
}
