// bring in modules
const mongoose = require('mongoose');
const fs = require('fs');

// bring in Antares services
//const contentService = require('../../services/content_service.js');

// bring in Antares utilities
const utilities = require('../../utilities/utilities');

/**
 * @todo how am I going to bring in models from themes dir?
 */



// setting the API password for local and production environments
var apiPassword = 'whatpassword';
if (process.env.NODE_ENV === 'production') {
	apiPassword = process.env.API_PASSWORD;
}

var pages = mongoose.model('Page');

/**
 * this function creates one of a specific type of content
 *
 *
 */
module.exports.createOneByContent = function(req, res) {


  let test = req.params.contentType + ' created';

	// create a new model document
	var thisPage = new pages();

	// populate the relevant properties from the body of the request
	//page.url = req.body.url;
	thisPage.title = 'Sample Title';
	//page.alternativeTitle = req.body.alternativeTitle;
	thisPage.body = 'Sample Body';
	//page.bodyTwo = req.body.bodyTwo;
	//page.bodyThree = req.body.bodyThree;
	//page.bodyFour = req.body.bodyFour;
	//page.bodyFive = req.body.bodyFive;
	//page.published = req.body.published;
	//page.publishedDate = new Date();

	//if (req.body.password === apiPassword) {

		// save the final document to the database
		thisPage.save(function(err, thisPage) {
			utilities.sendJsonResponse(res, 201, thisPage);
		});

	//} else {

		//utilities.sendJsonResponse(res, 403, "Nice try, buddy.");
	//}

};
