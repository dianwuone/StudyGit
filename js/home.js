//alert("home.js loaded");

var homeCtl = {
	offset: 0,
	
	getPlaylist: function (offset, limit, handler){
		var result;	// http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=6
		$.ajax({
			type:"get",
			url:"http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset="+offset+"&limit="+limit,
			async:true,
			dataType: "json",
			success: function(data){
				if (data.code === 200)
					handler(data.playlists);
			}
		});
		var a = 1;
	}, 
	
	loadPage: function (){
		this.getPlaylist(this.offset, 6, function(data){
			console.log(data);
		
			var playlists = $("#playlists");
			
			for (var i = 0; i < data.length; i++) {
				var cell = $("#templateCell").html();
				var $cell = $(cell);
				
				$cell.find("div").html(data[i].playCount);
				$cell.find("img").attr("src", data[i].coverImgUrl);
				$cell.find("p").html(data[i].name);
				
				$cell.find("a").attr("href", "#/detail?id="+data[i].id)
				.data("id", data[i].id).click(function(){
					console.log($(this).data("id"));
					playlistId = $(this).data("id");
					route("detail");
				});
				
				playlists.append($cell);
			}
		});
		this.offset += 6;
	}
};

(function(){
	homeCtl.loadPage();
})();

