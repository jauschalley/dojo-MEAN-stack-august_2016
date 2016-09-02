
var users = require('../controllers/users.js');

module.exports = function(app){
	app.post('/create_user', users.createUser);
	app.post('/verify_user', users.verifyUser);
}