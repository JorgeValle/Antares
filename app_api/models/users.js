var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	userName: { type: String, unique: true },
	email: { type: String, unique: true },
	password: { type: String },
	createdDate: { type: Date },
	deletedDate: { type: Date },
	roles: { type: Array }
});

// compile schema to bson, telling mongo to use 'users' collection
mongoose.model('User', userSchema, 'users');