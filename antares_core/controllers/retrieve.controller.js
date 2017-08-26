// bring in modules
const mongoose = require('mongoose');
const fs = require('fs');

// bring in Antares services
//const contentService = require('../../services/content.service.js');

// bring in Antares utilities
const utilities = require('../utilities/utilities');

/**
 * @todo how am I going to bring in models from themes dir?
 */



// setting the API password for local and production environments
var apiPassword = 'whatpassword';
if (process.env.NODE_ENV === 'production') {
	apiPassword = process.env.API_PASSWORD;
}
var pages = mongoose.model('Page');
var posts = mongoose.model('Post');
/**
 * this function gets all of a specific type of content
 *
 *
 */
module.exports.retrieveAllByContentType = function(req, res) {

    let test = req.params.contentType;
	//var sortBy = req.query.sortby;

	posts.find({}).exec(function(err, posts) {
		utilities.sendJsonResponse(res, 200, posts);
	});
};
/**
 * this function gets one of a specific type of content
 *
 *
 */
module.exports.retrieveOneByContentType = function(req, res) {

  let contentId = req.params.id;
	// get the url from the router
	//var wantedUrl = req.params.url;

	// go fetch wanted content via mongoose
	//pages.findOne({'url': wantedUrl }, function(err, page) {

		// return 200 only if page is found, otherwise return 404
		//if(page) {
			utilities.sendJsonResponse(res, 200, contentId);
		//} else {
			//utilities.sendJsonResponse(res, 404);
		//}
	//});

};
