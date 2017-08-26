// bring in modules
const mongoose = require('mongoose');
const fs = require('fs');

// bring in Antares services
const contentService = require('../../services/content_service.js');

// bring in Antares utilities
const utilities = require('../../antares_core/utilities/utilities');

/**
 * @todo how am I going to bring in models from themes dir?
 */



// setting the API password for local and production environments
var apiPassword = 'whatpassword';
if (process.env.NODE_ENV === 'production') {
	apiPassword = process.env.API_PASSWORD;
}

/**
 * this function deletes one of a specific type of content
 *
 *
 */
module.exports.deleteOnePage = function(req, res) {

	// get the url from the router
	var wantedUrl = req.body.url;

	// if it maches local or prod environment password, go ahead
	if (req.body.password === apiPassword) {

		// find the document, and delete it
		pages.findOneAndRemove({'url': wantedUrl }, function(err, page) {
			utilities.sendJsonResponse(res, 200, 'Content has been deleted.');
		});

	} else {

		utilities.sendJsonResponse(res, 403, "Nice try, buddy.");
	}

};
