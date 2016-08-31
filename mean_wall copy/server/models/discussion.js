var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: String,
	_topic: [{type: Schema.Types.ObjectId, ref: "Topics"}],
	_answer: [{type: Schema.Types.ObjectId, ref: "Answers"}],
	_comment: [{type: Schema.Types.ObjectId, ref: "Comments"}],
}, {timestamps:true});

var TopicSchema = new mongoose.Schema({
	title: String,
	content: String,
	category: String,
	_user: {type: Schema.Types.ObjectId, ref: "Users"},
	_answer: [{type: Schema.Types.ObjectId, ref: "Answers"}],
}, {timestamps:true});

var AnswerSchema = new mongoose.Schema({
	_topic: {type: Schema.Types.ObjectId, ref: "Topics"},
	content: String,
	_user: {type: Schema.Types.ObjectId, ref: "Users"},
	_comment:[{type: Schema.Types.ObjectId, ref: "Comments"}],
	vote_up: Number,
	vote_down: Number,
}, {timestamps:true});

var CommentSchema = new mongoose.Schema({
	_answer: {type: Schema.Types.ObjectId, ref: "Answers"},
	_user: {type: Schema.Types.ObjectId, ref: "Users"},
	content: String,
}, {timestamps:true});

mongoose.model('Users', UserSchema);
var Users = mongoose.model('Users')
mongoose.model('Topics', TopicSchema);
var Topics = mongoose.model('Topics')
mongoose.model('Answers', AnswerSchema);
var Answers = mongoose.model('Answers')
mongoose.model('Comments', CommentSchema);
var Comments= mongoose.model('Comments')