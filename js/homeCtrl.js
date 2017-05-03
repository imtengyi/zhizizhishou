app.controller('homeCtrl', function($scope, $http) {
	$scope.navbar = [{
			html: "网站首页",
			href: "#/home"
		}, {
			html: "风格展示",
			href: "#/styleShow"
		}, {
			html: "新闻动态",
			href: "#/news"
		}, {
			html: "私人订制",
			href: "#/personalTailor"
		}, {
			html: "品牌故事",
			href: "#/brandStory"
		}, {
			html: "团队介绍",
			href: "#/team"
		}, {
			html: "关于我们",
			href: "#/aboutUs"
		}, {
			html: "联系我们",
			href: "#/contactUs"
		}]
		//	{html:"新品上市",href:"#/newArrival"},,{html:"在线留言",href:"#/onlineMessage"}

	$scope.carousel = ['img/carousel-img1.jpg', 'img/carousel-img2.jpg', 'img/carousel-img3.jpg']

	$scope.productClassification = [{
		src: 'img/productClassification1.jpg',
		name: '钻石女戒',
		class: 'nvjie'
	}, {
		src: 'img/productClassification2.jpg',
		name: '钻石男戒',
		class: 'nanjie'
	}, {
		src: 'img/productClassification3.jpg',
		name: '钻石吊坠',
		class: 'diaozhui'
	}, {
		src: 'img/productClassification4.jpg',
		name: '钻石耳钉',
		class: 'erding'
	}, {
		src: 'img/productClassification5.jpg',
		name: '钻石手链',
		class: 'shoulian'
	}, {
		src: 'img/productClassification6.jpg',
		name: '黄金系列',
		class: 'huangjin'
	}, ]

	//	连接php,查询8个
	$http.get("php/queryNews.php?page=1&num=8&category=公司新闻")
		.success(function(response) {
			$scope.companyNews = response.list;
		});

	$http.get("php/queryNews.php?page=1&num=8&category=业界新闻")
		.success(function(response) {
			$scope.industryNews = response.list;
		});

	$(function() {
		$('.carousel-control.left').on('click', function() {
			$('.carousel').carousel('prev')
			return false;
		})
		$('.carousel-control.right').on('click', function() {
			$('.carousel').carousel('next')
			return false;
		})
		$('.navbar-brand').last().on('click', function(e) {
			e.preventDefault()
		})
		$('#myTab').on('click', 'li', function(e) {
			var a = $(this).index()
			$('#myTab a:eq(' + a + ')').tab('show')
			e.preventDefault()
		})
		$('.news').on('click', 'a[href="#"]', function(e) {
			e.preventDefault()
			$('#myModal #myModalLabel').html($(this).html())
			$('#myModal .modal-body').html($(this).attr('content'))
			$('#myModal').modal('show')
		})

		$('.fixTool :button:first').on('click', function() {
			$('html,body').animate({
				scrollTop: '0px'
			}, 800);
		})
		$(window).on('scroll', function() {
			if(document.body.scrollTop > $(window).height()) {
				$('.fixTool :button:first').fadeIn(1000)
			} else {
				$('.fixTool :button:first').fadeOut(1000)
			}
		})

		$("body").on('mouseover', "[title]", function(e) {
			$(this).tooltip('show')
		})

		var arr = ["钻石女戒", "钻石男戒", "钻石吊坠", "钻石耳钉", "钻石手链", "黄金系列"]
		var arr2 = ['nvjie', 'nanjie', 'diaozhui', 'erding', 'shoulian', 'huangjin']
		var urlStr
		$('.tabStyle').empty()
		$('#myTabContent').empty()
		for(var i = 0; i < arr2.length; i++) {
			if(i == 0) {
				var str = '<li class="active"><a href="#' + arr2[i] + '" data-toggle="tab">' + arr[i] + '</a></li>'
			} else {
				var str = '<li><a href="#' + arr2[i] + '" data-toggle="tab">' + arr[i] + '</a></li>'
			}
			$('.tabStyle').append(str)
			urlStr = "php/queryProduct.php?start=0&num=4&category=" + arr[i] + "&series=all&sort=num"
			num(i, urlStr)
		}

		function num(i, urlStr) {
			$.ajax({
				url: urlStr,
				success: function(e) {
					var data = JSON.parse(e)
					if(i == 0) {
						var str = '<div class="tab-pane fade in active" id="' + arr2[i] + '">   <div class="row"></div>  </div>'
					} else {
						var str = '<div class="tab-pane fade" id="' + arr2[i] + '">   <div class="row"></div>  </div>'
					}
					$('#myTabContent').append(str)

					for(var j = 0; j < data.list.length; j++) {
						var str = '<div class="col-xs-6 col-md-3 overflowDiv">  	<img src="' + data.list[j].imgSrc + '" class="img-responsive"/>   </div>'
						$('#' + arr2[i] + ' .row').append(str)
					}
				},
				error: function() {
					alert('查询出错')
				}
			})
		}

		$('.productClassification').on('mouseover', '.thumbnail', function() {
			$(this).children('img').css('transform', 'rotateY(360deg)')
		}).on('mouseout', '.thumbnail', function() {
			$(this).children('img').css('transform', 'rotateY(0deg)')
		})

		//
		$('#myModalLogin').find('p').on('click', verificationCode)
		$('#myModalLogin').on("show.bs.modal", function() {
			showUser()
			verificationCode()
			clearCss()
			$('#myModalLogin #name')[0].focus()
		});
		$('#myModalLogin').find('button[type="submit"]').on('click', checkAndSend)
		$('#myModalLogin').find('button[type="button"]').last().on('click', function() {
			var expires = new Date(new Date().getTime() - 1000 * 60 * 60);
			document.cookie = 'user= ;path=/;expires=' + expires.toGMTString();
			$('#userName').html('<span class="glyphicon glyphicon-user"></span>登录')
			location.reload()
		})

		function clearCss() {
			$('#myModalLogin #name').css('border', '')
			$('#myModalLogin .labelName').css('color', '')
			$('#myModalLogin #password').css('border', '')
			$('#myModalLogin .labelPassword').css('color', '')
			$('#myModalLogin #code').css('border', '')
			$('#myModalLogin .labelCode').css('color', '')
		}

		function checkAndSend() {
			var name = $('#myModalLogin #name').val().trim()
			var password = $('#myModalLogin #password').val().trim()
			if(name.length == 0) {
				clearCss()
				$('#myModalLogin #name').css('border', '2px solid red')
				$('#myModalLogin .labelName').css('color', 'red')
				$('#myModalLogin #name')[0].focus()
				return false;
			} else {
				$('#myModalLogin #name').css('border', '')
				$('#myModalLogin .labelName').css('color', '')
			}
			if(password.length == 0) {
				clearCss()
				$('#myModalLogin #password').css('border', '2px solid red')
				$('#myModalLogin .labelPassword').css('color', 'red')
				$('#myModalLogin #password')[0].focus()
				return false;
			} else {
				$('#myModalLogin #password').css('border', '')
				$('#myModalLogin .labelPassword').css('color', '')
			}
			if($('#myModalLogin .code').html().toUpperCase() != $('#myModalLogin #code').val().trim().toUpperCase()) {
				clearCss()
				$('#myModalLogin #code').val('')
				$('#myModalLogin #code').css('border', '2px solid red')
				$('#myModalLogin .labelCode').css('color', 'red')
				verificationCode()
				$('#myModalLogin #code')[0].focus()
				return false;
			} else {
				$('#myModalLogin #code').css('border', '')
				$('#myModalLogin .labelCode').css('color', '')
			}

			if($("form.login")[0].optionsRadiosinline.value == 'option1') {
				if(window.localStorage) {
					window.localStorage.user = $('#myModalLogin #name').val().trim()
					window.localStorage.password = $('#myModalLogin #password').val().trim()
				}
			} else if($("form.login")[0].optionsRadiosinline.value == 'option2') {
				if(window.localStorage) {
					window.localStorage.user = ''
					window.localStorage.password = ''
				}
			}
			var urlstr = "php/queryUser.php?name=" + name + "&password=" + password + ""
			$.ajax({
				type: "get",
				url: urlstr,
				async: true,
				success: function(e) {
					if(e == 1) {
						var expires = new Date(new Date().getTime() + 1000 * 60 * 60);
						document.cookie = 'user=' + name + ';path=/;expires=' + expires.toGMTString();
						cookieUser()
						$('#myModalLogin').modal('hide')
						location.reload()
					} else if(e == 0) {
						verificationCode()
						alert("帐号有误")
					}
				}
			});
		}

		cookieUser()

		function cookieUser() {
			var arr = document.cookie.split(";")
			for(var i = 0; i < arr.length; i++) {
				if(arr[i].indexOf("user=") != -1) {
					$('#userName').html(arr[i].slice(arr[i].indexOf("user=") + 5))
				}
			}
		}

		function showUser() {
			if(window.localStorage && window.localStorage.user) {
				$('#myModalLogin #name').val(window.localStorage.user)
				$('#myModalLogin #password').val(window.localStorage.password)
			} else {
				$('#myModalLogin #name').val('')
				$('#myModalLogin #password').val('')
			}
			$('#code').val('')
		}

		function verificationCode() {
			var arr = []
			var arr2 = []
			var code = ''
			for(var i = 0; i < 26; i++) {
				arr.push(97 + i)
			}
			for(var j = 0; j < 10; j++) {
				arr.push(48 + j)
			}
			for(var k = 0; k < 4; k++) {
				var num = Math.floor(Math.random() * arr.length)
				arr2.push(arr[num])
			}
			for(var u = 0; u < arr2.length; u++) {
				code += String.fromCharCode(arr2[u])
			}
			code = code.toUpperCase()
			$('#myModalLogin .code').html(code)
		}

		tabActive()
		$('.myTab').on('click', 'li', function() {
			$('.myTab li').removeClass('active')
			$(this).addClass('active')
		})

		function tabActive() {
			$('.myTab li').removeClass('active')
			var a = location.href
			for(var i = 0; i < $scope.navbar.length; i++) {
				if(a.indexOf($scope.navbar[i].href) != -1) {
					$('.myTab li').eq(i).addClass('active')
				}
			}
		}

		map()

		function map() {
			var map = new BMap.Map("allmap");
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r) {
				if(this.getStatus() == BMAP_STATUS_SUCCESS) {
					var myP1 = new BMap.Point(r.point.lng, r.point.lat) || new BMap.Point(116.424374, 39.914668) //起点
					var myP2 = new BMap.Point(113.315842, 22.909952); //终点
					var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), { //小车图片
						//offset: new BMap.Size(0, -5),    //相当于CSS精灵
						imageOffset: new BMap.Size(0, 0) //图片的偏移量。为了是图片底部中心对准坐标点。
					});
					var driving2 = new BMap.DrivingRoute(map, {
						renderOptions: {
							map: map,
							autoViewport: true
						}
					}); //驾车实例
					driving2.search(myP1, myP2); //显示一条公交线路
					window.run = function() {
						var driving = new BMap.DrivingRoute(map); //驾车实例
						driving.search(myP1, myP2);
						driving.setSearchCompleteCallback(function() {
							var pts = driving.getResults().getPlan(0).getRoute(0).getPath(); //通过驾车实例，获得一系列点的数组
							var paths = pts.length; //获得有几个点

							var carMk = new BMap.Marker(pts[0], {
								icon: myIcon
							});
							map.addOverlay(carMk);
							i = 0;

							function resetMkPoint(i) {
								carMk.setPosition(pts[i]);
								if(i < paths) {
									setTimeout(function() {
										i++;
										resetMkPoint(i);
									}, 100);
								}
							}
							setTimeout(function() {
								resetMkPoint(5);
							}, 100)

						});
					}
					setTimeout(function() {
						run();
					}, 1500);
					map.enableScrollWheelZoom(true);
				} else {
					alert('failed' + this.getStatus());
				}
			}, {
				enableHighAccuracy: true
			})
		}
	})

})