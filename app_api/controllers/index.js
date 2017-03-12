var mongoose = require('mongoose');

// bringing in the pages collection
var pages = mongoose.model('Page');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.readAllPages = function(req, res) {
	pages.find({}).exec(function(err, pages) {
		sendJsonResponse(res, 200, pages);
	})
};

module.exports.readOnePage = function(req, res) {

	// get the url from the router
	var wantedUrl = req.params.url;

	// go fetch wanted content via mongoose
	pages.findOne({'url': wantedUrl }).exec(function(err, page) {
		sendJsonResponse(res, 200, page);
	})
};

module.exports.createOnePage = function(req, res) {

	// create a new model document
	var page = new pages();

	// populate the relevant properties from the body of the request
	page.url = req.body.url;
	page.title = req.body.title;
	page.body = req.body.body;
	page.published = req.body.published;
	page.publishedDate = new Date();

	// save the final document to the database
	page.save(function(err, page) {
		sendJsonResponse(res, 201, page);
	})

};

module.exports.updateOnePage = function(req, res) {

	var page = new pages();

	page.url = req.body.url;
	page.title = req.body.title;
	page.body = req.body.body;
	page.published = req.body.published;

	page.save(function(err, page) {
		sendJsonResponse(res, 201, page);
	})

};

module.exports.deleteOnePage = function(req, res) {

	// get the url from the router
	var wantedUrl = req.params.url;

	// find the document, and delete it
	pages.findOne({'_id': req.body.id }).remove( function(err, page) {
		sendJsonResponse(res, 200, 'Content has been deleted.');
	});

};