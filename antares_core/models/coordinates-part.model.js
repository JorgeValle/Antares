const mongoose = require('mongoose');

var coordinatesSchema = new mongoose.Schema({
  lat: Number,
  lng: Number
});

// export the part, so we can use it on custom models
module.exports = coordinatesSchema;
