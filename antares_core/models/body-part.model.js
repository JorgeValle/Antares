const mongoose = require('mongoose');

var bodySchema = new mongoose.Schema({
  body: String
});

// export the part, so we can use it on custom models
module.exports = bodySchema;
