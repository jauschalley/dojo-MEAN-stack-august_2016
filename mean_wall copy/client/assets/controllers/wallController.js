app.controller('wallController', ['$scope', 'commentFactory', 'answerFactory', 'topicFactory', '$location', '$cookies', '$routeParams', function($scope, commentFactory, answerFactory, topicFactory, $location, $cookies, $routeParams){
	$scope.user = $cookies.getObject('user')
	$scope.topicwall = {};
	$scope.answer_list = {};
	$scope.comment_list = {};

	$scope.findTopic = function(){
		$scope.body = {};
		$scope.body._topic = $routeParams.id
		topicFactory.getTopic($scope.body, function(results){
			$scope.topicwall = results;
		})
	}
	$scope.findTopic()

	$scope.addAnswer = function(){
		$scope.newAnswer._user = $scope.user._id;
		$scope.newAnswer._topic = $scope.topicwall._id;
		answerFactory.create($scope.newAnswer, function(results){
			$scope.newAnswer = {};
		})
		$scope.findAnswers();
	}
	$scope.findAnswers = function(){
		$scope.body._topic = $routeParams.id;
		answerFactory.getAnswers($scope.body, function(results){
			$scope.answer_list = results;
			$scope.comment_list = results._comment
			console.log($scope.answer_list)
		})
	}
	$scope.findAnswers();
	$scope.thumbsUp = function(id){
		answerFactory.voteUp(id, function(results){
			$scope.findAnswers();
		})
	}
	$scope.thumbsDown = function(id){
		answerFactory.voteDown(id, function(results){
			$scope.findAnswers();
		})
	}
	$scope.addComment = function(id){
		console.log(id)
		$scope.newComment._user = $scope.user._id;
		commentFactory.create(id, $scope.newComment, function(results){
			console.log(results)
		$scope.findAnswers();
		})
	}
}]);