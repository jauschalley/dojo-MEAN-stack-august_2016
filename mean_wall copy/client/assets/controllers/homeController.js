app.controller('homeController', ['$scope', 'userFactory', '$location', '$cookies', '$routeParams', function($scope, userFactory, $location, $cookies, $routeParams){
	$scope.newUser;
	var user = $cookies.getObject('user')
	$scope.addUser = function(){
		userFactory.create($scope.newUser, function(results){
			$scope.newUser = {};
			$cookies.remove("user")
			$cookies.putObject("user", results)
			// console.log($cookies.getObject('user'))
			$location.url('/dashboard')
		})
	
		
	}

}]);