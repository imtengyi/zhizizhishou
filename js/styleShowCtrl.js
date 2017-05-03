app.controller('styleShowCtrl', function($scope) {

	$(function() {

		var start = 0 //查询的总条数
		var totalPage = 1
		var listNum = 8 //每次显示的数量
		var category = "all"
		var series = "all"
		var sort = "num"
		var ajax = true //是否在ajax请求
		var index = 0 //模态的index()
		var loginBoo = false
		query(start)

		$(window).on('scroll', function() {
			if(document.body.scrollHeight - document.body.scrollTop - $(window).height() < 30 && ajax == false) {
				query(start)
			}
		})

		$('.filter ul li').on('click', function(e) {
			e.preventDefault()
			$(this).parent('ul').find('li:eq(' + $(this).index() + ')').tab('show')
			if($(this).parent().index() == 0) {
				if($(this).index() == 0) {
					category = 'all'
				} else {
					category = $(this).children('a').html()
				}
			} else if($(this).parent().index() == 1) {
				if($(this).index() == 0) {
					series = 'all'
				} else {
					series = $(this).children('a').html()
				}
			} else if($(this).parent().index() == 2) {
				sort = $(this).attr('sort')
			}
			start = 0
			query(start)
			$('.productContent').empty()
		})

		$('.productContent').on('click', 'img', function() {
			$('.styleModal .modal-header span').html($(this).parent().parent().find('span').first().html())
			$('.styleModal .modal-body img').attr('src', $(this).attr('src'))
			index = $(this).index('img')
		})
		$('.styleModal').on('click', '.modal-body', function(e) {
			if(e.offsetX < $(this).width() / 2) {
				index--
				if(index < 0) {
					index = 0
					return
				}
				$('.styleModal .modal-header span').html($('.productContent img:eq(' + index + ')').parent().parent().find('span').first().html())
				$('.styleModal .modal-body img').fadeOut(400, function() {
					$('.styleModal .modal-body img').attr('src', $('.productContent img:eq(' + index + ')').attr('src'))
					$(this).fadeIn(400)
				})
			} else if(e.offsetX > $(this).width() / 2) {
				index++
				if(index > $('.productContent img').length) {
					index = $('.productContent img').length - 1
					return
				}
				$('.styleModal .modal-header span').html($('.productContent img:eq(' + index + ')').parent().parent().find('span').first().html())
				$('.styleModal .modal-body img').fadeOut(400, function() {
					$('.styleModal .modal-body img').attr('src', $('.productContent img:eq(' + index + ')').attr('src'))
					$(this).fadeIn(400)
				})
			}
		})

		function query(page) {
			var urlStr = "php/queryProduct.php" + "?start=" + start + "&num=" + listNum + "&category=" + category + "&series=" + series + "&sort=" + sort
			$.ajax({
				url: urlStr,
				success: function(e) {
					var data = JSON.parse(e)
					for(var a in data.list) {
						var str = '<div class="col-md-3 col-sm-4 col-xs-6" num="' + data.list[a].num + '">	<div class="thumbnail">  <div class="thumbnailImg"><img src="' + data.list[a].imgSrc + '"data-toggle="modal" data-target="#myModal" data-backdrop="static" class="img-responsive"></div> <div class="caption">  <h5>编号：<span>' + data.list[a].productNumber + '</span></h5>   <h5>市场价：<span>' + data.list[a].marketPrice + '</span></h5> <h5>价格：<span>' + data.list[a].price + '</span></h5>  <h5>重量（克拉）：<span>' + data.list[a].weight + '</span></h5>  <h5>系列：<span>' + data.list[a].series + '</span></h5>   <h5>类别：<span>' + data.list[a].category + '</span></h5>  </div>	</div>	</div>'
						$('.productContent').append(str)
						start++
					}
					if(loginBoo) {
						$(".productContent .thumbnail").parent().draggable({
							cursor: "pointer",
							opacity: "0.8",
							revert: "invalid",
							revertDuration: "500",
							stack: ".productContent .thumbnail",
							containment: "document",
							stop: function(event, ui) {
								var x = ui.position.left
								var y = ui.position.top
								var width = $(this).width()
								var dis = Math.sqrt(x * x + y * y)
								if(dis > width * 2) {
									if(window.confirm("确定删除这条数据")) {
										var urlstr = "php/deleteProduct.php?num=" + $(this).attr("num")
										var a = $(this)
										$.ajax({
											type: "get",
											url: urlstr,
											async: true,
											success: function() {
												a.hide("blind", 800)
												if(start > 0) {
													start--
												}
											}
										});
									}
								}
							}
						})
					}

				},
				error: function() {
					alert('查询出错')
				},
				beforeSend: function() {
					ajax = true
					$('.freshen').removeClass('hidden')
				},
				complete: function() {
					ajax = false
					$('.freshen').addClass('hidden')
				}
			})
		}

		var arr = document.cookie.split(";")
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].indexOf("user=") != -1) {
				loginBoo = true
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
							var productNumber = obj.data[i].productNumber
							var marketPrice = obj.data[i].marketPrice
							var price = obj.data[i].price
							var weight = obj.data[i].weight
							var series = obj.data[i].series
							var category = obj.data[i].category
							var imgSrc = obj.data[i].imgSrc
							var urlstr = "php/insetProduct.php?productNumber=" + productNumber + "&marketPrice=" + marketPrice + "&price=" + price + "&weight=" + weight + "&series=" + series + "&category=" + category + "&imgSrc=" + imgSrc
							$.ajax({
								type: "get",
								url: urlstr,
								async: true,
								success: function(e) {
									num++
									if(num == obj.data.length) {
										start = 0
										query(start)
										$('.productContent').empty()
									}
								},
								error: function(e) {
									alert("出错")
								}
							});
						}
					}
				}
				return
			}
		}

	})

})