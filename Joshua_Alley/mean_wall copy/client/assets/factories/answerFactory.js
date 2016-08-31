app.factory('answerFactory', ['$http', function($http){
	function answerFactory(){
		this.create = function(answer, callback){
			$http.post('/create_answer', answer).then(function(results){
				callback(results.data)
			})
		}
		this.getAnswers = function(body, callback){
			$http.post('/find_answers', body).then(function(results){
				callback(results.data);
			})
		}
		this.voteUp = function(id, callback){
			$http.post('/vote_up/' + id).then(function(results){
				callback(results.data);
			})
		}
		this.voteDown = function(id, callback){
			$http.post('/vote_down/' + id).then(function(results){
				callback(results.data)
			})
		}
	}
	return new answerFactory();
}])