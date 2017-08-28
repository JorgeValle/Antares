const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt =require('jsonwebtoken');

var rolesSchema = new Schema({
  roles: [String]
});


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
  zipcode : String,
  roles: [rolesSchema]
});

/**
 *
 *
 */
userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
/**
 *
 *
 */
userSchema.methods.validatePassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt,1000, 64).toString('hex');
	return this.hash === hash;
};
/**
 *
 *
 */
userSchema.methods.generateJWT = function() {

    var expiry = new Date();
	expiry.setDate(expiry.getDate() +7); // 7 day lifetime

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime()/1000),

	},'thisissecret'); // replace with env variable on heroku

};

// compile schema to bson
mongoose.model('User', userSchema, 'users');
