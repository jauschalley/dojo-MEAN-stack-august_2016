app.factory('topicFactory', ['$http', function($http){
	function topicFactory(){
		this.topic = {};
		this.create = function(topic, callback){
			$http.post('/create_topic', topic).then(function(results){
				callback(results.data);
			})
		}
		this.allTopics = function(callback){
			$http.get('/get_topics').then(function(results){
				callback(results.data);
			})
		}
		this.getTopic = function(topic, callback){
			$http.post('/find_topic', topic).then(function(results){
				callback(results.data);
			})
		}
	}
	return new topicFactory();
}])