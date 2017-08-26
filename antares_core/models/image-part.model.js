const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  source: String,
  caption: String
});

// export the part, so we can use it on custom models
module.exports = imageSchema;
