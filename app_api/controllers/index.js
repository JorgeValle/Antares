var mongoose = require('mongoose');
// bringing in the pages collection
var pages = mongoose.model('Page');
var fs = require('fs');


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
	pages.findOne({'url': wantedUrl }, function(err, page) {

		// return 200 only if page is found, otherwise return 404
		if(page) {
			sendJsonResponse(res, 200, page);
		} else {
			sendJsonResponse(res, 404);
		}
	});

};

module.exports.createOnePage = function(req, res) {

	// create a new model document
	var page = new pages();

	// populate the relevant properties from the body of the request
	page.url = req.body.url;
	page.title = req.body.title;
	page.alternativeTitle = req.body.alternativeTitle;
	page.bodyOne = req.body.bodyOne;
	page.bodyTwo = req.body.bodyTwo;
	page.bodyThree = req.body.bodyThree;
	page.bodyFour = req.body.bodyFour;
	page.bodyFive = req.body.bodyFive; 
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
  		bodyOne: req.body.bodyOne,
  		bodyTwo: req.body.bodyTwo,
  		bodyThree: req.body.bodyThree,
  		bodyFour: req.body.bodyFour,
  		bodyFive: req.body.bodyFive,
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

/**
 * All methods for writing to files
 */

module.exports.writeSettings = function(req, res) {

	var siteTitle = req.body.siteTitle;
	var email = req.body.email;

	var settingsObject = {
			siteTitle: siteTitle,
			email: email,
			password: password
	};

	var json = JSON.stringify(settingsObject);

	fs.writeFile('antares_core/config/site.json', json, function (err) {
	  if (err) {
	  	return console.log(err);
	  } else {
	  	sendJsonResponse(res, 200, 'File written');
	}
	});
};