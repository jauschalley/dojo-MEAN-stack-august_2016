var discussions = require('../controllers/discussions.js')
module.exports = function(app){
	app.post('/create_user', discussions.createUser);
	app.post('/create_topic', discussions.createTopic);
	app.post('/create_answer', discussions.createAnswer);
	app.post('/find_answers', discussions.findAnswers);
	app.get('/get_topics', discussions.getAllTopics);
	app.get('/get_users', discussions.getAllUsers);
	app.post('/find_user', discussions.getUser);
	app.post('/find_topic', discussions.getTopic);
	app.post('/vote_up/:id', discussions.thumbsUp);
	app.post('/vote_down/:id', discussions.thumbsDown);
	app.post('/create_comment/:id', discussions.addComment)
}



