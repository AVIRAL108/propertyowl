'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var BaseModel = require('./BaseModel');
var dbConnection = BaseModel.getMongooseConnection();

// TODO: Move all relevant fields from UserProfile to Project
var UsersSchema = new mongoose.Schema({
  user_id : String,
  email : String,
  first_name : String,
  last_name : String,
  display_name : String,
  password : String,
  verify_token : String,
  email_verified : {type: String, default: 0},
  user_type : String,
  google : mongoose.Schema.Types.Mixed,
  facebook : mongoose.Schema.Types.Mixed,
  date_add: { type: Date, default: Date.now }
}, {collection: 'user'});

var model = module.exports = dbConnection.model('User', UsersSchema);

