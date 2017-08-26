const mongoose = require('mongoose');

var slugSchema = new mongoose.Schema({
  slug: { type: String, unique: true }
});

module.exports = slugSchema;
