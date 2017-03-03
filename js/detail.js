var detailCtl = {
	loadDetail: function (id, handler){
		$.ajax({
			type:"get",
			url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
			async:true,
			dataType: "json",
			success: function(data){
				if (data.code === 200) {
//					console.log(data.playlist);
					handler(data.playlist);
				}
				
			}
		});
	}, 
	
	getMusic: function(id, handler) {
//		
		$.ajax({
			type:"get",
			url:"http://musicapi.duapp.com/api.php?type=url&id="+id,
			async:true,
			dataType: "json",
			success: function(data){
				if (data.code === 200) {
					handler(data.data[0]);
				}
				
			}
		});
	},
	
	showDetail: function(id) {
		var self = this;
		
		this.loadDetail(id, function(data){
			
			// 显示歌单信息
			var playlist = $("#playlist");
			playlist.html(data.name);
			
			// 显示歌曲列表
			var songs = $("#songs");
			var item = $("#templateItem").html();
			
			for (var i = 0; i < data.tracks.length; i++) {
				var track = data.tracks[i];
				
				var $item = $(item);
				
				$item.find(".no").html(i+1);
				$item.find(".name").html(track.name);
				$item.find(".artist").html(track.ar[0].name);
				$item.find("a").attr("id", track.id).click(function(){
					
					var id = $(this).attr("id");
					
					self.getMusic(id, function(data){
//						console.log(data);
						alert(data.url);
						musicCtl.play(data);
					});
					
				});
				
				songs.append($item);
			}
		});
	}
};

(function(){
//	var id = window.location.href;
//	var start = id.indexOf("id=")+3;
//	id = id.substr(start);
//	
//	alert(id);
	alert(playlistId);
	detailCtl.showDetail(playlistId);
})();
