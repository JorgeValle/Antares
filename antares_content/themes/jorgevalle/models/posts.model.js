const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const metadataSchema = require('../../../../antares_core/models/metadata.model');
const slugSchema = require('../../../../antares_core/models/metadata.model');
const titleSchema = require('../../../../antares_core/models/title.model');
const bodySchema = require('../../../../antares_core/models/body.model');

let postSchema = new Schema({
  metadataSchema,
  slugSchema,
  titleSchema,
  bodies: [bodySchema]
});

// compile schema to bson, telling mongo to use 'posts' collection
mongoose.model('Post', postSchema, 'posts');
