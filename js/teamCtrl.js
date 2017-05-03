app.controller('teamCtrl',function ($scope,$http) {
	
	
	$(function () {
		
		$(".team .nav li").on('click',function (e) {
			e.preventDefault()
			var height=50
			for(var i=0;i<$(this).index();i++){
				var id=$(".team .nav li").eq(i).children("a").attr("href")
				height+=$(id).height()
				if(i==2){
					height+=80
				}
			}
			$('html,body').animate({scrollTop: height+'px'}, 800);
		})
		
		
	})

})