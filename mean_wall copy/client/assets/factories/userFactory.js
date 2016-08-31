app.factory('userFactory', ['$http', function($http){
	function userFactory(){
		this.user ={};
		this.create = function(user, callback){
			$http.post('/create_user', user).then(function(results){
				callback(results.data);
			});
			}
		this.allUsers = function(callback){
			$http.get('/get_users').then(function(results){
				callback(results.data);
			})
		}
		this.getUser = function(user, callback){
			$http.post('/find_user', user).then(function(results){
				callback(results.data);
			})
		}
	}
	return new userFactory();
}])