var mongoose = require('mongoose');
var dbURI = 'mongodb://127.0.0.1/Antares';

if (process.env.NODE_ENV === 'production') {
	dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

var gracefulShutdown = function (msg, callback) {
	mongoose.connection.close(function () {
		console.log("Mongoose disconnected through" + msg);
		callback();
	});
};

mongoose.connection.on("connected", function() {
	console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function(err) {
	console.log("Mongoose connection error: " + err )
});
mongoose.connection.on("disconnected", function() {
	console.log("Mongoose disconnected");
});

process.once("SIGUSR2", function() {
	gracefulShutdown("nodemon restart", function() {
		process.kill(process.pid, "SIGUSR2");
	});
});

process.once("SIGINT", function() {
	gracefulShutdown("app termination", function() {
		process.exit(0);
	});
});

process.once("SIGTERM", function() {
	gracefulShutdown("Heroku app shutdown", function() {
		process.exit(0);
	});
});

// requiring the all core models
require('./metadata-part.model');
require('./slug-part.model');
require('./title-part.model');
require('./body-part.model');
require('./date-part.model');
require('./user-part.model');

// requiring the all the needed models
require('../../antares_content/apps/jorge_valle/models/pages.model');
require('../../antares_content/apps/jorge_valle/models/posts.model');
