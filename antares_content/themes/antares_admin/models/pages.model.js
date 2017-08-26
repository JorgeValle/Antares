var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
	url: { type: String, unique: true },
	title: String,
	alternativeTitle: String,
	bodyOne: String,
	bodyTwo: String,
	bodyThree: String,
	bodyFour: String,
	bodyFive: String,
	publishedDate: { type: Date },
	published: Boolean,
	isHomepage: Boolean,
	lastModifiedDate: { type: Date }
});

// compile schema to bson, telling mongo to use 'pages' collection
mongoose.model('Page', pageSchema, 'pages');