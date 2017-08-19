/* GET home page */
module.exports.homepage = function(req, res) {
	res.render('homepage', { 
		documentTitle: 'Home',
		canonicalUrl: 'http://jorgevalle.com' + req.url,
		activeUrl: req.url
	});
};

/* GET timeline */
module.exports.timeline = function(req, res) {
	res.render('timeline', { 
		documentTitle: 'Timeline',
		canonicalUrl: 'http://jorgevalle.com' + req.url,
		activeUrl: req.url
	});
};