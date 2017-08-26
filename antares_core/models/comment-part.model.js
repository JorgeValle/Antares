const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  author: String,
  comment: String
});

// export the part, so we can use it on custom models
module.exports = bodySchema;
