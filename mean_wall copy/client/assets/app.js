var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function($routeProvider){
$routeProvider
	.when('/', {
		templateUrl: 'partials/welcome.html',
		controller: 'homeController'
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'dashboardController'
	})
	.when('/topic/:id', {
		templateUrl: 'partials/topic.html',
		controller: 'wallController'
	})
	.when('/user/:id', {
		templateUrl: 'partials/user.html',
		controller: 'userController'
	})
	.otherwise({
		redirectTo: '/'
	})
});