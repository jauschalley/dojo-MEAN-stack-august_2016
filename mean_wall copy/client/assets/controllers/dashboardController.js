app.controller('dashboardController', ['$scope', 'userFactory', 'topicFactory', '$location', '$cookies', '$routeParams', function($scope, userFactory, topicFactory, $location, $cookies, $routeParams){
	$scope.user = $cookies.getObject('user')
	$scope.topics;
	$scope.authors;
	$scope.posts;

	$scope.getTopics = function(){
		topicFactory.allTopics(function(results){
			$scope.topics = results;
		})
	}
	$scope.getTopics();

	$scope.addTopic = function(){
		$scope.newTopic._user = $scope.user._id
		topicFactory.create($scope.newTopic, function(results){
			$scope.newTopic = {};
			$scope.getTopics();
		})

	}

}]);