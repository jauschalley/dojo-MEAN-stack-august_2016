app.factory('commentFactory', ['$http', function($http){
	function commentFactory(){
		this.create = function(id, comment, callback){
			$http.post('/create_comment/' + id, comment).then(function(results){
				callback(results.data)
			})
		}
	}
	return new commentFactory();
}])