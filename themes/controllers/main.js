/* GET home page */
module.exports.index = function(req, res) {
	res.render('index', { 
		documentTitle: 'Home | JorgeValle.com'

	});
};