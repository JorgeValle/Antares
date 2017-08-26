var mongoose = require('mongoose');

var ratingsSchema = new mongoose.Schema({
});

// compile schema to bson
mongoose.model('Ratings', ratingsSchema);
