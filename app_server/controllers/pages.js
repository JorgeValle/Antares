var request = require("request");
var apiOptions = {
	server: "http://localhost:3000"
};

var requestOptions = {
	url: apiOptions.server,
	method: 'GET',
	json: {}
};

var renderPageByTitle = function(req, res, responseBody) {
	res.render('page', {
		title: 'Page by title',
		test: 'Testing syntax',
		apiResponse: responseBody
	});

	console.log("responseBody: " + responseBody);
};


request(requestOptions, function(err, response, body) {
	if(err) {
		console.log(err);
	} else if (response.statusCode === 200) {
		console.log(body);
	} else {
		console.log(response.statusCode);
	}
});

/* GET page by title */
module.exports.pageByTitle = function(req, res) {

	var requestOptions, path;
	path = '/api/pages/' + req.params.pageUrl;

	var fullUrl = apiOptions.server + path;

	requestOptions = {
		url: fullUrl,
		method: 'GET'
	};
	request(requestOptions, function(err, response, body) {

			console.log("Request error" + err);

			renderPageByTitle(req, res, body);

	});
};