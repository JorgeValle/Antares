var request = require("request");
var apiOptions = {
	server: "http://localhost:3000"
};

var requestOptions = {
	url: apiOptions.server,
	method: 'GET',
	json: {}
};

var renderQueryContent = function(req, res, responseBody) {
	res.render('blog', {
		documentTitle: " Blog | JorgeValle.com" ,
		// we parse JSON response to get properties ready for consumption in pug templates
		apiResponse: JSON.parse(responseBody)
	});

	console.log("responseBody from renderQueryContent: " + JSON.parse(responseBody));
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
module.exports.queryAll = function(req, res) {

	console.log('queryAll ran');

	var requestOptions, path;
	path = '/api/pages';

	var fullUrl = apiOptions.server + path;

	requestOptions = {
		url: fullUrl,
		method: 'GET'
	};
	request(requestOptions, function(err, response, body) {

			if (err) {
				console.log("Request error" + err);
			} else {
				renderQueryContent(req, res, body);
			}

	});
};