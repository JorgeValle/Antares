var request = require('request');
var apiOptions = {
	server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'http://murmuring-earth-39282.herokuapp.com';
}

/* GET home page */
module.exports.index = function(req, res) {

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

var renderQueryContent = function(req, res, responseBody) {
	res.render('index', {
		documentTitle: 'All Pages | Antares CMS' ,
		// we parse JSON response to get properties ready for consumption in pug templates
		apiResponse: JSON.parse(responseBody)
	});
};


module.exports.create = function(req, res) {
	res.render('create', { 
		documentTitle: 'Create Page | Antares CMS'
	});
};

module.exports.update = function(req, res) {
	res.render('update', { 
		documentTitle: 'Update Page | Antares CMS'
	});
};