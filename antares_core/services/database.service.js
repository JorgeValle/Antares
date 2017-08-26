var mongoose = require('mongoose');

/**
 *
 *
 */
module.exports.setDatabaseString = function(databaseString) {
}
/**
 *
 *
 */
module.exports.shutdownGracefully = function(message, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + message);
    callback();
  });
}
