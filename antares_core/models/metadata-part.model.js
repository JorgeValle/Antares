const mongoose = require('mongoose');

var metadataSchema = new mongoose.Schema({
  creationDate: Date,
  publishedDate: Date,
  lastModifiedDate: Date
});

// export the part, so we can use it on custom models
module.exports = metadataSchema;
