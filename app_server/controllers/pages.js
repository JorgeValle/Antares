/* GET page by title */
module.exports.pageByTitle = function(req, res) {
	res.render('page', {title: 'Page by title'});
};