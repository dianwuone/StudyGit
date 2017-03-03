var musicCtl = {
	play: function(data) {
		var $audio = $("#audio");
		$audio.attr("src", data.url);
		$audio.get(0).play();
	}
}
