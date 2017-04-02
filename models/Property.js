'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var BaseModel = require('./BaseModel');
var dbConnection = BaseModel.getMongooseConnection();

// TODO: Move all relevant fields from UserProfile to Project
var PropertyDataSchema = new mongoose.Schema({
  type : String,
  ownership_type : String,
  price : Number,
  price_type : String,
  area : Number,
  area_unit : String,
  picture_path : String,
  full_address : mongoose.Schema.Types.Mixed,
  description : String,
  other_features : [String],
  contact_details : mongoose.Schema.Types.Mixed,
  type_of_advertisement : [String],
  date_add: { type: Date, default: Date.now }
}, {collection: 'property'});

var model = module.exports = dbConnection.model('Property', PropertyDataSchema);

