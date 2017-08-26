var mongoose = require('mongoose');

var priceSchema = new mongoose.Schema({
  value: Number
});

// compile schema to bson
mongoose.model('Price', priceSchema);
