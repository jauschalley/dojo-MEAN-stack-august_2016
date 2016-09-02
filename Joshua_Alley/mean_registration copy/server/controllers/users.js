var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var bcrypt = require('bcrypt');


function UsersController(){
	this.createUser = function(req,res){
		var user = new Users({
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			password: req.body.password,
			birthday: req.body.birthday
		})
		user.save(function(err, results){
			if(err){
				res.json(err);
			}else{
				res.json(results)
			}
		})
	}
	// bcrypt.compareSync(password, user.password);
	this.verifyUser = function(req,res){
		console.log(req.body)
		Users.findOne({email: req.body.email}, function(err, user){
			if(err){
				res.json(err);
			}else{
				res.json(user)
			}
		})
	}
};
module.exports = new UsersController();