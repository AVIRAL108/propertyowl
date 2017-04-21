'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var BaseModel = require('./BaseModel');
var dbConnection = BaseModel.getMongooseConnection();

// TODO: Move all relevant fields from UserProfile to Project
var UsersSchema = new mongoose.Schema({
  email : String,
  first_name : String,
  last_name : String,
  password : String,
  date_add: { type: Date, default: Date.now }
}, {collection: 'user'});

var model = module.exports = dbConnection.model('User', UsersSchema);

