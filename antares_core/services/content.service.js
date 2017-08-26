// bring in sorting utility
var sortingService;

/**
 * this is the function that retrieves any content type
 *
 */
module.exports.retrieveAllContent = function(contentType, req, res) {
  contentType.find({}).sort({ 'publishedDate': sortBy }).exec(function(err, returnedContent) {
    utilities.sendJsonResponse(res, 200, pages);
  });
};
/**
 * this is my test function
 *
 */
module.exports.retrieveSpecificContent = function(contentType, req, res) {
  // get the url from the router
  let wantedUrl = req.params.url;
  // go fetch wanted content via mongoose
  contentType.findOne({ 'url': wantedUrl }, function(err, returnedContent) {
    // return 200 only if page is found, otherwise return 404
    if(currentContentType) {
      utilities.sendJsonResponse(res, 200, currentContentType);
    } else {
      utilities.sendJsonResponse(res, 404);
    }
  });
};



module.exports.createSpecificContent = function(contentType, req, res) {

};


module.exports.deleteSpecificContent = function(contentId, req, res) {

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