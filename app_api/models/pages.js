var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
	url: { type: String, unique: true },
	title: String,
	body: String,
	publishedDate: { type: Date },
	published: Boolean,
	isHomepage: Boolean
});

// compile schema to bson, telling mongo to use 'pages' collection
mongoose.model('Page', pageSchema, 'pages');