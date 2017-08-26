/**
 * this is my test function
 * @param {string} res - the test value
 * @param {string} status - the status response
 *
 */
module.exports.sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};