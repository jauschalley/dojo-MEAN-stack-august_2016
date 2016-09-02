app.factory('loginFactory', ['$http', function($http){
	function loginFactory(){
		this.user = {};
		this.create = function(user, callback){
			$http.post('/create_user', user).then(function(results){
				callback(results.data);
			})
		}
		this.verify = function(user, callback){
			var success = {};
			$http.post('/verify_user', user).then(function(results){
				// console.log(user)
				// console.log(results.data)
				if(user.email === results.data.email && user.password === results.data.password){
					success = {
						logged: 1,
						message: "You have successfully logged into your account!"}
				}
				if(user.email === results.data.email && user.password != results.data.password){
					success = {
						logged: 2,
						message: "The password you entered does not match the given email."}
				}
				if(user.email != results.data.email){
					success = {
						logged: 2,
						message:"The information supplied dpes not match our records.  Please click below to create an account."}
				}

				callback(success)

			})
		}
	}
	return new loginFactory();
}])