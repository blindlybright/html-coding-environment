(function(document, window, $, undefined){
	var dt = new Date().getTime();

	function serverpoll() {
		var rnd = Math.random().toString().split("0.").join(""),
			xhr = new XMLHttpRequest();

		xhr.open('GET', "/tmp/lastupdate?dt=" + dt + "&rnd=" + rnd, true); //&removelongpoll
		xhr.onreadystatechange = function(){
			if (xhr.readyState != 4) return;

			//console.log("serverpoll returned: " + xhr.status + "; " + xhr.responseText);
			if (xhr.status !== 404) {
				if (xhr.responseText * 1 != parseInt(xhr.responseText)) {
					window.location.reload();
				}
			}
			//serverpoll();
		}
		xhr.onerror = xhr.onabort = function(){
			//console.log("serverpoll aborting");
			setTimeout(serverpoll, 1000);
		}
		xhr.send(null);
	}
	serverpoll();
	console.log("time now: " + new Date(dt));
})(document, window, jQuery);
