app.controller('aboutUsCtrl', function($scope) {

	$(function() {
		var speed = 20;
		var tab = document.getElementById("demo");
		var tab1 = document.getElementById("demo1");
		var tab2 = document.getElementById("demo2");
		tab2.innerHTML = tab1.innerHTML;
		var myMar = setInterval(marquee, speed);
		tab.onmouseover = function() {
			clearInterval(myMar)
		};
		tab.onmouseout = function() {
			myMar = setInterval(marquee, speed)
		};

		$('.about .overflowDiv').on('mouseover', function() {
			$(this).children('img').css('transform', 'rotate(360deg)')
		}).on('mouseout', function() {
			$(this).children('img').css('transform', 'rotate(0deg)')
		})

		function marquee() {
			if(tab2.offsetWidth - tab.scrollLeft <= 0)
				tab.scrollLeft -= tab1.offsetWidth
			else {
				tab.scrollLeft++;
			}
		}
	})

})