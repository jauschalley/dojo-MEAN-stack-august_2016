var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Topics = mongoose.model('Topics');
var Answers = mongoose.model('Answers');
var Comments = mongoose.model('Comments');
function DiscussionsController(){
	this.createUser = function(req, res){
		var user = new Users(
		{
			name: req.body.name
		});
		user.save(function(err){
			if(err){
				res.json(err);
			}else{
				res.json(user);
			}
		});
	}
	this.createTopic = function(req, res){
		var topic = new Topics(
		{
			title: req.body.title,
			content: req.body.content,
			category: req.body.category,
			_user: req.body._user,
		});
		topic.save(function(err){
				if(err){
					res.json(err);
				}else{
					Users.findOne({_id: req.body._user}, function(err, user){
						if(err){
							res.json(err);
						}else{
							user._topic.push(topic)
							user.save(function(err){
								if(err){
									res.json(err);
								}else{
									res.json(topic);
								}
							})
						}
					})
				}
			})
		}
	this.createAnswer = function(req, res){
		var answer = new Answers(
		{
			content: req.body.content,
			vote_up: 0,
			vote_down: 0,
			_topic: req.body._topic,
			_user: req.body._user
		});
		answer.save(function(err){
			if(err){
				err.json(err);
			}else{
				Users.findOne({_id:req.body._user}, function(err, user){
					if(err){
						res.json(err);
					}else{
						user._answer.push(answer)
						user.save(function(err){
							if(err){
								res.json(err);
							}else{
								Topics.findOne({_id:req.body._topic}, function(err, topic){
									if(err){
										res.json(err);
									}else{
										topic._answer.push(answer)
										topic.save(function(err){
											if(err){
												res.json(err)
											}else{
												res.json(answer)
											}
										})
									}
								})
							}
						})
					}
				})
			}
		})
	}

	this.getAllTopics = function(req, res){
		Topics.find({})
		.populate('_user _answer')
		.exec(function(topic, err){
			if(err){
				res.json(err);
			}else{
				res.json(topics);
			};
		});
	};
	this.getAllUsers = function(req, res){
		Users.find({}, function(user, err){
			if(err){
				res.json(err);
			}else{
				res.json(users);
			};
		});
	};
	this.getUser = function(req, res){
		Users.findOne({_id:req.body._user})
		.populate('_comment')
		.exec(function(user,err){
			if(err){
				res.json(err);
			}else{
				res.json(user);
			}
		})
	}
	this.getTopic = function(req, res){
		Topics.findOne({_id:req.body._topic})
		.populate('_comment _user _answer')
		.exec(function(topic,err){
			if(err){
				res.json(err);
			}else{
				res.json(topic);
			}
		})
	}
	this.findAnswers = function(req, res){
		Answers.find({_topic:req.body._topic})
		.populate('_user')
		.populate({path:'_comment',
			populate:[
			{path: '_user'}
			]
		})
		.exec(function(answer,err){
			if(err){
				res.json(err);
			}else{
				res.json(answer);
				console.log(answer)
			}
		})
	}
	this.thumbsUp = function(req, res){
		Answers.findOne({_id:req.params.id}, function(err, answer){
			answer.vote_up ++;
			answer.save(function(err){
				if(err){
					res.json(err)
				}else{
					res.json(answer)
				}
			})
		})
	}
	this.thumbsDown = function(req, res){
		Answers.findOne({_id:req.params.id}, function(err, answer){
			answer.vote_down ++;
			answer.save(function(err){
				if(err){
					res.json(err)
				}else{
					res.json(answer)
				}
			})
		})
	}
	this.addComment = function(req,res){
		var comment = new Comments(
		{
			content: req.body.content,
			_user: req.body._user	
		})
		Answers.findOne({_id:req.params.id}, function(err, answer){
			comment.save(function(err){

			answer._comment.push(comment);
			answer.save(function(err){
				if(err){
					res.json(err)
				}else{
					Users.findOne({_id:req.body._user}, function(err, user){
						user._comment.push(comment);
						user.save(function(err){
							if(err){
								res.json(err)
							}else{
								res.json(comment)
							}
						})
					})
				}
			})
		})
	})
	}
};
module.exports = new DiscussionsController();