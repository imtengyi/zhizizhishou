var app=angular.module('myApp',['ngRoute', 'ngAnimate'])

app.config(function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl'
    }).when('/aboutUs',{
    	templateUrl:'pages/aboutUs.html',
    	controller:'aboutUsCtrl'
    }).when('/styleShow',{
    	templateUrl:'pages/styleShow.html',
    	controller:'styleShowCtrl'
    }).when('/brandStory',{
    	templateUrl:'pages/brandStory.html',
    	controller:'brandStoryCtrl'
    }).when('/personalTailor',{
    	templateUrl:'pages/personalTailor.html',
    	controller:'personalTailorCtrl'
    }).when('/news',{
    	templateUrl:'pages/news.html',
    	controller:'newsCtrl'
    }).when('/team',{
    	templateUrl:'pages/team.html',
    	controller:'teamCtrl'
    }).when('/contactUs',{
    	templateUrl:'pages/contactUs.html',
    	controller:'contactUsCtrl'
    }).otherwise({
        redirectTo: '/home'
    })
});


//.when('/newArrival',{
//  	templateUrl:'pages/newArrival.html',
//  	controller:''
//  })
//.when('/onlineMessage',{
//  	templateUrl:'pages/onlineMessage.html',
//  	controller:''
//  })