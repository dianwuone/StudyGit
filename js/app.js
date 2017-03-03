var config = {
	
};

var playlistId;

function route(mode, box){
	if (box === undefined)
		box = $("#content");
	
//	box.load("view/"+mode+".html");
	$.ajax({
		url: "view/"+mode+".html",
		success: function(data) {
			box.html(data);
			// 加载模块对应的JS
			loadModeJs(mode);
		}
	});
}

function loadModeJs(mode){
	$.ajax({
		url: "js/"+mode+".js",
		dataType: "script"
	});
}

$(function(){
	route("home");
	route("music", $("#music"))
});


