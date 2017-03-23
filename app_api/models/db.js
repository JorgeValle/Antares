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

// requiring the all the needed models
require('./pages');
require('./users');
