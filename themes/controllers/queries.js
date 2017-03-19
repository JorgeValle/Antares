var request = require("request");
var apiOptions = {
	server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'http://murmuring-earth-39282.herokuapp.com';
}

var requestOptions = {
	url: apiOptions.server,
	method: 'GET',
	json: {}
};

var renderQueryContent = function(req, res, responseBody) {
	res.render('blog', {
		documentTitle: 'Blog | JorgeValle.com' ,
		// we parse JSON response to get properties ready for consumption in pug templates
		apiResponse: JSON.parse(responseBody)
	});

	console.log("responseBody from renderQueryContent: " + JSON.parse(responseBody));
};

var renderSitemap = function(req, res, responseBody) {
	res.render('sitemap', {
		documentTitle: 'Sitemap | JorgeValle.com' ,
		// we parse JSON response to get properties ready for consumption in pug templates
		apiResponse: JSON.parse(responseBody)
	});
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

/* GET page by title */
module.exports.sitemap = function(req, res) {

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
				renderSitemap(req, res, body);
			}

	});
};