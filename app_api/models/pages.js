var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
	url: String,
	title: String,
	body: String,
	publishedDate: { type: Date, default: Date.now },
	published: Boolean
});

// compile schema to bson, telling mongo to use 'pages' collection
mongoose.model('Page', pageSchema, 'pages');