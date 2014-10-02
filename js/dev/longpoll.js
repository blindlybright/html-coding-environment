(function(document, window, $, undefined){
	var dt = new Date().getTime();

	function longpoll() {
		var rnd = Math.random().toString().split("0.").join(""),
			xhr = new XMLHttpRequest();

		xhr.open('GET', "/tmp/longpolldate?dt=" + dt + "&rnd=" + rnd, true); //&removelongpoll
		xhr.onreadystatechange = function(){
			if (xhr.readyState != 4) return;

			//console.log("longpoll returned: " + xhr.status + "; " + xhr.responseText);
			if (xhr.responseText === "refreshing client") {
				window.location.reload();
			}
			//longpoll();
		}
		xhr.onerror = xhr.onabort = function(){
			//console.log("longpoll aborting");
			setTimeout(longpoll, 1000);
		}
		xhr.send(null);
	}
	longpoll();

})(document, window, jQuery);
