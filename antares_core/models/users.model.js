var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt =require('jsonwebtoken');

var userSchema = new Schema({
	name: {
	   type: String,
	   required: true
	   },
	email: {
	    type: String,
		required: true,
		unique: true
		},
	hash: {
	    type:String,
		required:true
	},
	salt:{
	    type:String,
		required: true
		},
	zipcode : String
});
userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	//console.log(this.salt);
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
userSchema.methods.validatePassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt,1000, 64).toString('hex');
	return this.hash === hash;
};
userSchema.methods.generateJWT = function(){
	var expiry = new Date();
	//set for 7 day lifetime
	expiry.setDate(expiry.getDate() +7);
	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime()/1000),

	},'thisissecret');
	//replace with env variable for heroku
};

var User = mongoose.model('User', userSchema, 'users');
