app.controller('LoginController', ['$scope', 'loginFactory', '$location', '$cookies', '$routeParams', function($scope, loginFactory, $location, $cookies, $routeParams){	

	var user = $cookies.getObject("user_log")
	var error;
	var confirmation="";
	var success=""
	var code = {};
	// console.log($cookies.getObject("user_log"))



	$scope.addUser = function(){
		if ($scope.newUser.password != $scope.newUser.confirm){
			$scope.confirmation = "The password you entered does not match your confirmation."
			$cookies.remove("user_log")
		}else{
			$scope.new_user = {
				email: $scope.newUser.email,
				first_name: $scope.newUser.first_name,
				last_name: $scope.newUser.last_name,
				password: $scope.newUser.password,
				birthday: $scope.newUser.dob
			}
			loginFactory.create($scope.new_user, function(results){
				if(results.errors){
					$scope.error = results.errors
				}else{
					// console.log(results)
					$scope.error = "";
					$scope.confirmation ="Success!"
					$cookies.remove("user_log")
					$cookies.putObject("user_log", results)
					$location.url('/register')
				}
			})
		}
	}
	
	$scope.login = function(){
		$scope.log = {
			email: $scope.attempt.email,
			password: $scope.attempt.password
		}
		loginFactory.verify($scope.log, function(results){
			if(results.logged == 1){
				$cookies.remove("user_log")
				$cookies.putObject("user_log", $scope.log)
				$scope.code = results;
				// console.log(results)
				// console.log($cookies.getObject("user_log"))
			}else{
				$cookies.remove("user_log")
			}
		})

	}
}]);