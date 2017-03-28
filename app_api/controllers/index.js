var mongoose = require('mongoose');
// bringing in the pages collection
var pages = mongoose.model('Page');

// setting the API password for local and production environments
var apiPassword = 'whatpassword';
if (process.env.NODE_ENV === 'production') {
	apiPassword = process.env.API_PASSWORD;
}

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.readAllPages = function(req, res) {

	var sortBy = req.query.sortby;

	pages.find({}).sort({'publishedDate': sortBy}).exec(function(err, pages) {
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
	page.alternativeTitle = req.body.alternativeTitle;
	page.body = req.body.body;
	page.published = req.body.published;
	page.publishedDate = new Date();

	if (req.body.password === apiPassword) {

		// save the final document to the database
		page.save(function(err, page) {
			sendJsonResponse(res, 201, page);
		});

	} else {

		sendJsonResponse(res, 403, "Nice try, buddy.");
	}

};

module.exports.updateOnePage = function(req, res) {

	// get url to update from router middleware and set to var
	var query = {'url': req.body.url};

	// construct the inserted data from request body
	var updateData = {
		title: req.body.title,
		alternativeTitle: req.body.alternativeTitle,
  		body: req.body.body,
  		lastModifiedDate: new Date()
	};

	// check for presence of password
	if (req.body.password === apiPassword) {

		// {new:true} returns updated doc
		pages.findOneAndUpdate(query, updateData, {new: true}, function(err, page) {
			sendJsonResponse(res, 201, page);
		});

	} else {

		sendJsonResponse(res, 403, "Nice try, buddy.");
	}

};

module.exports.deleteOnePage = function(req, res) {

	// get the url from the router
	var wantedUrl = req.body.url;

	// if it maches local or prod environment password, go ahead
	if (req.body.password === apiPassword) {

		// find the document, and delete it
		pages.findOneAndRemove({'url': wantedUrl }, function(err, page) {
			sendJsonResponse(res, 200, 'Content has been deleted.');
		});

	} else {

		sendJsonResponse(res, 403, "Nice try, buddy.");
	}

};