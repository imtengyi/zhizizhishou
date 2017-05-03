app.controller('brandStoryCtrl', function($scope) {

	$(function() {
		scrol()
		$(window).on('resize', scrol)

		function scrol() {
			$('.bgImg div').last().height($('.bgImg div').first().height())
			$('.tbgImg div').last().height($('.tbgImg div').first().height())
		}

	})

})