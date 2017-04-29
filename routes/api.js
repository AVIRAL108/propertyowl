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
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "vrlgarg@gmail.com",
        pass: "aviral@989"
    }
});

var models = require('../models');

/* GET users listing. */
router.post('/submit-property', passport.authenticationMiddleware(), function(req, res, next) {
  	controller_routes.submitProperty(req, res, models);
});

router.post('/register', function(req, res, next) {
  	controller_routes.registerUser(req, res, models, smtpTransport);
});

router.post('/property-image-upload', function(req, res, next) {
  res.json({"abc":"yes"});
    //controller_routes.registerUser(req, res, models);
});

router.post('/login-register', passport.authenticate('local', {
    successRedirect: '/submit-property',
    failureRedirect: '/login-register',
    failureFlash : true
  }));

router.get('/get-all-property', function(req, res, next) {
  	controller_routes.getAllProperties(req, res, models);
});

router.get('/verify-mail', function(req, res, next){
    controller_routes.verifyMail(req, res, models, smtpTransport);
});

module.exports = router;
