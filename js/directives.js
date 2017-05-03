app.directive("newsshow", function() {
    return {
        restrict : "E",
        template : '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">	 <div class="modal-dialog">	 <div class="modal-content"> <div class="modal-header">	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">	 &times;  </button>	 <h4 class="modal-title" id="myModalLabel">模态框（Modal）标题</h4>	 </div>	 <div class="modal-body">在这里添加一些文本</div>	 </div>	 </div>	</div>   '
    };
});


//app.directive("login", function() {
//  return {
//      restrict : "E",
//      template : '<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">  &times;  </button>  <h4 class="modal-title" id="myModalLabel">帐号密码登录</h4> </div>  <div class="modal-body">	<form class="form-horizontal" role="form">  <div class="form-group">  <label for="name" class="col-sm-2 control-label">帐号</label>   <div class="col-sm-10">  <input type="text" class="form-control" id="name" placeholder="请输入帐号" autocomplete="off">  </div> </div><div class="form-group"> <label for="password" class="col-sm-2 control-label">密码</label>  <div class="col-sm-10"> <input type="password" class="form-control" id="password" placeholder="请输入密码" autocomplete="off"> </div> </div> <div class="form-group"> <label for="code" class="col-sm-2 control-label">验证码</label> <div class="col-sm-10">  <input type="text" class="form-control" id="code" placeholder="请输入验证码" autocomplete="off">  </div>  </div>  <div class="form-group">  <label for="firstname" class="col-sm-2 control-label"></label>  <div class="col-sm-10"><p class="form-control-static bg-info col-xs-3 code text-center">1234</p>  </div> </div> <div class="form-group"> <div class="col-sm-offset-2 col-sm-10"> <div class="checkbox">  <label class="checkbox-inline"> <input type="radio" name="optionsRadiosinline" id="optionsRadios3" value="option1" checked> 记住密码 </label> <label class="checkbox-inline"> <input type="radio" name="optionsRadiosinline" id="optionsRadios4"  value="option2"> 不记住密码 </label>  </div> </div>  </div> <div class="form-group">  <div class="col-sm-offset-5 col-sm-7">  <button type="submit" class="btn btn-default">登录</button> <button type="button" class="btn btn-default">注册</button>  </div>  </div></form> </div> </div> </div></div>',
//      link: function(scope, el, attrs, controller) {
//      	el.find('p').on('click',verificationCode)
//          el.on("show.bs.modal", function () {
//          	showUser()
//          	verificationCode()
//          });
//          el.find('button[type="submit"]').on('click',checkAndSend)
//          function checkAndSend () {
//          	if($('#name').val().trim().length==0){
//          		$('#name').css('border','2px solid red')
//          		return false;
//          	}
//          	else if($('#password').val().trim().length==0){
//          		alert("请填写密码")
//          		return false;
//          	}
//          	else if($('.code').html().toUpperCase()!=$('#code').val().trim().toUpperCase()){
//          		alert('验证码错误')
//          		verificationCode ()
//          		return false;
//          	}
//          	
//          	if(document.forms[0].optionsRadiosinline.value=='option1'){
//          		if(window.localStorage){
//          			window.localStorage.user=$('#name').val().trim()
//          			window.localStorage.password=$('#password').val().trim()
//          		}
//          	}
//          	else if(document.forms[0].optionsRadiosinline.value=='option2'){
//          		if(window.localStorage){
//          			window.localStorage.user=''
//          			window.localStorage.password=''
//          		}
//          	}
//          	
//          }
//          function showUser () {
//          	if(window.localStorage && window.localStorage.user){
//          		$('#name').val(window.localStorage.user)
//          		$('#password').val(window.localStorage.password)
//          	}
//          	else{
//          		$('#name').val('')
//          		$('#password').val('')
//          	}
//          	$('#code').val('')
//          }
//          function verificationCode () {
//				var arr=[]
//				var arr2=[]
//				var code=''
//				for(var i=0;i<26;i++){
//					arr.push(97+i)
//				}
//				for(var j=0;j<10;j++){
//					arr.push(48+j)
//				}
//				for(var k=0;k<4;k++){
//					var num=Math.floor(Math.random()*arr.length)
//					arr2.push(arr[num])
//				}
//				for(var u=0;u<arr2.length;u++){
//					code+=String.fromCharCode(arr2[u])
//				}
//				code=code.toUpperCase()
//				$('.code').html(code)
//			}
//      }
//  };
//});