const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var titleSchema = new Schema({
  title: String
});

// export the part, so we can use it on custom models
module.exports = titleSchema;
