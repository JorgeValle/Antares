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
 * this function updates one of a specific type of content
 *
 *
 */
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
			utilities.sendJsonResponse(res, 201, page);
		});

	} else {

		utilities.sendJsonResponse(res, 403, "Nice try, buddy.");
	}

};
