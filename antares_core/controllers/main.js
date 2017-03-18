/* GET home page */
module.exports.index = function(req, res) {
	res.render('admin', { 
		documentTitle: 'Admin | Antares'

	});
};