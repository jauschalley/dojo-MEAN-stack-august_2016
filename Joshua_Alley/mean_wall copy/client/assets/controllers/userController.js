app.controller('userController', ['$scope', 'userFactory', '$location', '$cookies', '$routeParams', function($scope, userFactory, $location, $cookies, $routeParams){
	$scope.shownuser = {}
	$scope.findUser = function(){
		$scope.body = {}
		$scope.body._user = $routeParams.id
		userFactory.getUser($scope.body, function(results){
			$scope.shownuser = results;
		})
	}
	$scope.findUser()
	

}]);