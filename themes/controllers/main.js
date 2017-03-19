/* GET home page */
module.exports.homepage = function(req, res) {
	res.render('homepage', { 
		documentTitle: 'Home | JorgeValle.com'

	});
};