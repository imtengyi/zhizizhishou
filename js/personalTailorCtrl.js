app.controller('personalTailorCtrl', function($scope) {

	$(function() {

		var dayTime = 24 * 60 * 60 * 1000
		for(var i = 0; i < $('#select_date')[0].options.length; i++) {
			var now = new Date()
			var day = new Date(new Date().getTime() + dayTime * (i + 1))

			var year = day.getFullYear()
			var month = day.getMonth() + 1
			var date = day.getDate()
			if(month <= 9) {
				month = '0' + month
			}
			if(date <= 9) {
				date = '0' + date
			}
			$('#select_date')[0].options[i].value = year + '-' + month + '-' + date
			$('#select_date')[0].options[i].innerHTML = year + '-' + month + '-' + date
		}

		$('#u_appo_btn').on('click', function() {
			var date = $('#select_date').val()
			var hour = $('#select_hour').val()
			var name = $('#name').val().trim()
			var tel = $('#tel').val().trim()
			var urlstr = "php/insertPersonalTailor.php?date=" + date + "&hour=" + hour + "&name=" + name + "&tel=" + tel

			var pattern1 = /[\u4e00-\u9fa5]/
			if((!name) || (!pattern1.test(name))) {
				$('.label-name').css('color', 'red')
				$('#name').css('border', '2px solid red')
				return
			} else {
				$('.label-name').css('color', '')
				$('#name').css('border', '')
			}
			var pattern2 = /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/
			if((!tel) || (!pattern2.test(tel))) {
				$('.label-tel').css('color', 'red')
				$('#tel').css('border', '2px solid red')
				return
			} else {
				$('.label-tel').css('color', '')
				$('#tel').css('border', '')
			}

			$.ajax({
				type: "get",
				url: urlstr,
				async: true,
				success: function(e) {
					if(e == 1) {
						alert("预约成功")
						$('#name').val('')
						$('#tel').val('')
					} else {
						alert("预约出错")
					}
				}
			});

		})

	})

})