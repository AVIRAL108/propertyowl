var express = require('express');
var router = express.Router();
var C = require('../constants');
var mongoose = require('mongoose');
console.log("Environment is : "+process.env.NODE_ENV);
var passport = require('passport');
passport.authenticationMiddleware = require('../authentication/middleware');
var controller_routes = require('../api_routes/controller');


mongoose.connection.on('open', function (ref) {
  console.log('info', 'Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
  console.log('error', 'Could not connect to mongo server!', err);
});
var BaseModel = require('../models/BaseModel');
var mongooseConnection = mongoose.createConnection(C.config.mongoUrl,
                                              {auto_reconnect: true, server: { socketOptions: { keepAlive: 1 } }});
BaseModel.setMongooseConnection(mongooseConnection);


var models = require('../models');

/* GET users listing. */

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/submit-property',
                    failureRedirect : '/login-register'
            }));

router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));
router.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/submit-property',
            failureRedirect : '/login-register'
        }));

module.exports = router;
