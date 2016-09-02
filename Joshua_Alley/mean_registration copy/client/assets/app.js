var app = angular.module('app',['ngRoute', 'ngCookies']);

app.config(function($routeProvider){
$routeProvider
	.when('/', {
		templateUrl: 'partials/login.html',
		controller: 'LoginController'
	})
	.when('/register', {
		templateUrl: 'partials/registration.html',
		controller: 'LoginController'
	})
	.otherwise({
		redirectTo: '/'
	})
});