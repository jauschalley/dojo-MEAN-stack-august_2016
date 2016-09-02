var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		trim: true,
		required: [true, "You must enter a valid email address."]

	},
	first_name: {
          type: String,
          required: [true, "You must enter your first name."],
          trim: true,
    },
	last_name: {
          type: String,
          required: [true, "You must enter your last name."],
          trim: true,
    },
	password: {
		type: String,
		required: [true, "Your password must be at least 8 characters and less than 32 characters long."],
		minlength: 8,
		maxlength: 32
	},
	birthday: {
		type: Date,
		required: [true, "You must enter a valid date."]
	}
}, {timestamps:true})

UserSchema.pre('save', function(done){
	if(!this.isNew){
		return done();
	}
	bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
	done();
});

mongoose.model('Users', UserSchema);
var Users = mongoose.model('Users')