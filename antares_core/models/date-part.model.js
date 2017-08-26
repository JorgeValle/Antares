const mongoose = require('mongoose');

var dateSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date
});

// export the part, so we can use it on custom models
module.exports = dateSchema;
