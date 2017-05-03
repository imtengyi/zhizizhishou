app.controller('contactUsCtrl', function($scope, $http) {

	$(function() {

		var loginBoo = false

		$('#name').on('input', function(e) {
			$(this).val($(this).val().slice(0, 10))
		})
		$('#tel').on('input', function(e) {
			$(this).val($(this).val().slice(0, 20))
		})
		$('#content').on('input', function(e) {
			$(this).val($(this).val().slice(0, 200))
		})
		

		$(".contactForm")[0].onsubmit = function() {
			var name = $('#name').val().trim()
			var tel = $('#tel').val().trim()
			var content = $('#content').val()

			var pattern1 = /[\u4e00-\u9fa5]/
			if((!name) || (!pattern1.test(name))) {
				$('.labelName').css('color', 'red')
				$('#name').css('border', '2px solid red')
				$('#name')[0].focus()
				return
			} else {
				$('.labelName').css('color', '')
				$('#name').css('border', '')
			}
			var pattern2 = /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/
			if((!tel) || (!pattern2.test(tel))) {
				$('.labelTel').css('color', 'red')
				$('#tel').css('border', '2px solid red')
				$('#tel')[0].focus()
				return
			} else {
				$('.labelTel').css('color', '')
				$('#tel').css('border', '')
			}

			var urlStr = "php/insertMessage.php" + "?name=" + name + "&tel=" + tel + "&content=" + content
			$http.get(urlStr)
				.success(function(response) {
					if(response == 1) {
						$('#name').val('')
						$('#tel').val('')
						$('#content').val('')
						if(loginBoo) {
							query(currentPage())
						} else {
							alert("留言成功")
						}
					} else {
						alert("留言出错")
					}

				});
		}

		$('.pagination').on('click', 'a', function(e) {
			e.preventDefault()
		})
		$('.newsContent').on('click', 'a', function(e) {
			e.preventDefault()
			var urlStr = "php/deleteMessage.php" + "?num=" + $(this).attr('num')
			$.ajax({
				url: urlStr,
				success: function(e) {
					query(currentPage())
				}
			})
		})
		var page = 1 //页面的码数
		var pageNum = 3 //按钮的对称数目
		var listNum = 9 //每页显示的数量
		var toolPage //最后页的页码

		var arr = document.cookie.split(";")
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].indexOf("user=") != -1) {
				loginBoo = true
				query(currentPage())
				$('.pagination').removeClass("hidden")
			}
		}

		function query(page) {
			var urlStr = "php/queryMessage.php" + "?page=" + page + "&num=" + listNum
			$.ajax({
				url: urlStr,
				success: function(e) {
					$('.newsContent').empty()
					var data = JSON.parse(e)
					if(data.num % listNum == 0) {
						toolPage = data.num / listNum
					} else {
						toolPage = parseInt(data.num / listNum) + 1
					}
					showPage()
					for(var a in data.list) {
						var str = '<div class="col-xs-12 col-md-4 col-sm-6 messageParent">	<div class="thumbnail"> <div class="caption"><h3>' + data.list[a].name + '</h3> <h4>' + data.list[a].tel + '</h4> <p class="messgeContent" page="0" title="' + data.list[a].content + '">' + data.list[a].content + '</p>  <div class="row">	<div class="col-xs-6 col-xs-offset-6 text-right">' + data.list[a].date + ' </div>	</div>  <hr />	<div class="row">		<div class="col-xs-6 pull-right text-right">	<a href="#" num="' + data.list[a].num + '">DEL</a>		</div>	</div>  </div></div></div>'

						$('.newsContent').append(str)
					}
				},
				error: function() {
					alert('查询出错')
				}
			})
		}

		$('.pagination').on('click', 'li', changPageCursor)

		function changPageCursor() {
			if(!(isNaN($(this).text()) || $(this).text() == page)) {
				page = parseInt($(this).text()) || 1
				query(page)
				urlPage()
				showPage()
				window.scrollTo(0, 0)
			} else if($(this).get(0).className == 'lastPage') {
				if(page > 1) {
					page--
					query(page)
					urlPage()
					showPage()
					window.scrollTo(0, 0)
				}
			} else if($(this).get(0).className == 'nextPage') {
				if(page < toolPage) {
					page++
					query(page)
					urlPage()
					showPage()
					window.scrollTo(0, 0)
				}
			}
			if(page <= 1)
				$('.lastPage').addClass('disabled')
			if(page >= toolPage - 1)
				$('.nextPage').addClass('disabled')
		}

		function currentPage() {
			var url = location.href
			var indexStart, indexEnd
			if(url.indexOf('?page=') != -1) {
				indexStart = url.indexOf('?page=') + 6
				if(url.indexOf('&', indexStart) != -1) {
					indexEnd = url.indexOf('&', indexStart)
					page = url.slice(indexStart, indexEnd)
				} else
					page = url.slice(indexStart, url.length)
			} else if(url.indexOf('&page=') != -1) {
				indexStart = url.indexOf('&page=') + 6
				if(url.indexOf('&', indexStart) != -1) {
					indexEnd = url.indexOf('&', indexStart)
					page = url.slice(indexStart, indexEnd)
				} else
					page = url.slice(indexStart, url.length)
			} else
				page = 1
			page = parseInt(page) || 1
			return page
		}

		function urlPage() {
			var url = location.href
			var indexStart, indexEnd
			var newURL
			if(url.indexOf('?page=') != -1) {
				indexStart = url.indexOf('?page=') + 6
				if(url.indexOf('&', indexStart) != -1) {
					indexEnd = url.indexOf('&', indexStart)
					newURL = url.slice(0, indexStart) + page + url.slice(indexEnd, url.length)
				} else
					newURL = url.slice(0, indexStart) + page
			} else if(url.indexOf('&page=') != -1) {
				indexStart = url.indexOf('&page=') + 6
				if(url.indexOf('&', indexStart) != -1) {
					indexEnd = url.indexOf('&', indexStart)
					newURL = url.slice(0, indexStart) + page + url.slice(indexEnd, url.length)
				} else
					newURL = url.slice(0, indexStart) + page
			} else {
				if(url.indexOf('?') != -1)
					newURL = url + '&page=' + page
				else
					newURL = url + '?page=' + page
			}
			history.pushState(null, null, newURL)
		}

		function showPage() {
			$('.pagination').children().not('.lastPage,.nextPage').remove()
			var minPage, maxPage

			if(page - pageNum <= 0) {
				minPage = 1
				if(pageNum * 2 + 1 > toolPage) {
					maxPage = toolPage
				} else {
					maxPage = 1 + 2 * pageNum
				}
			} else {
				minPage = page - pageNum
				if(pageNum * 2 + 1 > toolPage) {
					maxPage = toolPage
				} else {
					maxPage = 1 + 2 * pageNum
				}
			}

			for(var i = minPage; i < maxPage + 1; i++) {
				if(i == page) {
					$('.nextPage').before('<li class="active"><a href="#">' + i + '</a></li>')
				} else
					$('.nextPage').before('<li><a href="#">' + i + '</a></li>')
			}
			if(page <= 1)
				$('.lastPage').addClass('disabled')
			if(page >= toolPage - 1)
				$('.nextPage').addClass('disabled')
		}

	})

})