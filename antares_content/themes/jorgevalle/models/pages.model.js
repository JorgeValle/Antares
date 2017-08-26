const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const metadataSchema = require('../../../../antares_core/models/metadata.model');
const titleSchema = require('../../../../antares_core/models/title.model');
const bodySchema = require('../../../../antares_core/models/body.model');
const coordinatesSchema = require('../../../../antares_core/models/coordinates.model');

let pageSchema = new Schema({
  //metadata: [metadataSchema],
  titleSchema,
  bodySchema,
  coordinatesSchema
});

// compile schema to bson, telling mongo to use 'pages' collection
mongoose.model('Page', pageSchema, 'pages');
