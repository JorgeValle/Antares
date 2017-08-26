// bring in modules
const mongoose = require('mongoose');
const fs = require('fs');

// bring in Antares services
//const contentService = require('../../services/content_service.js');

// bring in Antares utilities
const utilities = require('../../antares_core/utilities/utilities');

//bring in the collection
var users = mongoose.model('User');


/**
 * @todo how am I going to bring in models from themes dir?
 */



// setting the API password for local and production environments
var apiPassword = 'whatpassword';
if (process.env.NODE_ENV === 'production') {
	apiPassword = process.env.API_PASSWORD;
}

/**
 * this function updates one of a specific type of content
 *
 *
 */
module.exports.login = function(req, res) {
	//check all fields set
	if(!req.body.email || !req.body.password){
		utilities.sendJsonResponse(res, 400, {'message': 'All fields required'});
		return;
	}
	//use the local passport strategy
	passport.authenticate('local', function(err, user, info){
		var token;
		//for if passport fails
		if(err){
			utilities.sendJsonResponse(res, 404, err);
			return;
		}
		//we found a user, lets give them a jwt
		if(user){
			token = user.generateJWT();
			utilities.sendJsonResponse(res, 200, {'token' : token});
		}
		//if it hits here somethings really wrong
		else{
			utilities.sendJsonResponse(res, 401, info)
		}
	})(req, res);
};
/**
 *
 *
 *
 */
module.exports.signup = function(req, res) {
    var user = new users();
	user.name = req.body.name;
	user.email = req.body.email;
	user.setPassword(req.body.password);
	user.save(function(err, user){
		var token;
		if(err){
			utilities.sendJsonResponse(res, 400, err);
		}
		else{
			token = user.generateJWT();
			utilities.sendJsonResponse(res, 201, {'token': token});
		}
	});
}
