/*
Base Model to keep common code across all models
As of now, we just have getters/setters for connection
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var mongoose_connection = null;

var BaseModel = function() {
};

BaseModel.prototype.getMongooseConnection = function() {
  if (mongoose_connection) {
    return mongoose_connection;
  } else {
    return mongoose;
  }
};

BaseModel.prototype.setMongooseConnection = function(conn) {
  mongoose_connection = conn;
};

module.exports = new BaseModel();