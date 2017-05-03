app.controller('newsCtrl', function($scope) {

	$(function() {
		$('.pagination').on('click', 'a', function(e) {
			e.preventDefault()
		})
		$('.newsContent').on('click', 'a', function(e) {
			e.preventDefault()
			$('#myModal #myModalLabel').html($(this).html())
			$('#myModal .modal-body').html($(this).attr('content'))
			$('#myModal').modal('show')
		})
		var page = 1 //页面的码数
		var pageNum = 3 //按钮的对称数目
		var listNum = 10 //每页显示的数量
		var toolPage //最后页的页码
		var category = "公司新闻" //查询的类别
		newsHome()
		query(currentPage())

		$('.company').on('click', function() {
			category = "公司新闻"
			page = 1
			query(1)
			newsHome()
			urlPage()
			$('.newsTitle a').removeClass('text-muted')
			$(this).addClass('text-muted')
		})
		$('.industru').on('click', function() {
			category = "业界新闻"
			page = 1
			query(1)
			newsHome()
			urlPage()
			$('.newsTitle a').removeClass('text-muted')
			$(this).addClass('text-muted')
		})

		function query(page) {
			var urlStr = "./php/queryNews.php" + "?page=" + page + "&num=" + listNum + "&category=" + category
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
						var str = "<h4><a href='#' class='maxWidth' title='" + data.list[a].title + "' content='" + data.list[a].content + "'>" + data.list[a].title + "</a><span class='pull-right text-muted maxWidth'>" + data.list[a].date + "</span></h4><hr />"
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
				} else {
					page = url.slice(indexStart, url.length)
				}
			} else if(url.indexOf('&page=') != -1) {
				indexStart = url.indexOf('&page=') + 6
				if(url.indexOf('&', indexStart) != -1) {
					indexEnd = url.indexOf('&', indexStart)
					page = url.slice(indexStart, indexEnd)
				} else {
					page = url.slice(indexStart, url.length)
				}
			} else {
				page = 1
			}
			page = parseInt(page) || 1
			if(window.decodeURIComponent(url).indexOf("category=业界新闻") != -1) {
				category = "业界新闻"
			}
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

		function newsHome() {
			var url = location.href
			var indexStart, indexEnd
			var newURL
			if(url.indexOf('?category=') != -1) {
				indexStart = url.indexOf('?category=') + 10
				if(url.indexOf('&', indexStart) != -1) {
					indexEnd = url.indexOf('&', indexStart)
					newURL = url.slice(0, indexStart) + category + url.slice(indexEnd, url.length)
				} else
					newURL = url.slice(0, indexStart) + category
			} else if(url.indexOf('&category=') != -1) {
				indexStart = url.indexOf('&category=') + 10
				if(url.indexOf('&', indexStart) != -1) {
					indexEnd = url.indexOf('&', indexStart)
					newURL = url.slice(0, indexStart) + category + url.slice(indexEnd, url.length)
				} else
					newURL = url.slice(0, indexStart) + category
			} else {
				if(url.indexOf('?') != -1)
					newURL = url + '&category=' + category
				else
					newURL = url + '?category=' + category
			}
			history.pushState(null, null, newURL)
		}

		document.ondragover = function(e) {
			e.preventDefault()
		}
		document.ondrop = function(e) {
			e.preventDefault()
			var file = e.dataTransfer.files[0]
			var txt = new FileReader()
			txt.readAsText(file, 'gb2312')
			var num = 0
			txt.onload = function(e) {
				var obj = JSON.parse(e.target.result)
				for(var i = 0; i < obj.data.length; i++) {
					var title = obj.data[i].title
					var author = obj.data[i].author
					var content = obj.data[i].content
					var category = obj.data[i].category
					var urlstr = "php/insertNews.php?title=" + title + "&author=" + author + "&content=" + content + "&category=" + category
					$.ajax({
						type: "get",
						url: urlstr,
						async: true,
						success: function(e) {
							num++
							if(num == obj.data.length) {

								page = 1
								query(1)
								newsHome()
								urlPage()
							}
						},
						error: function(e) {
							alert("出错")
						}
					});
				}
			}
		}

	})

})