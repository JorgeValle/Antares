const mongoose = require('mongoose');

var subtitleSchema = new mongoose.Schema({
  title: String
});

// export the part
module.exports = subtitleSchema;
