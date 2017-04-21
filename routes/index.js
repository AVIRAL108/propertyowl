var express = require('express');
var router = express.Router();
var passport = require('passport');
passport.authenticationMiddleware = require('../authentication/middleware');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title:'Adsbowl-Find the Best place to advertize' });
});

router.get('/submit-property', passport.authenticationMiddleware(), function(req, res) {
  res.render('submit-property', { title:'Submit your Property and earn from it'});
});

router.get('/login-register', function(req, res) {
  res.render('login-register', { title:'Signup or Register today and get best prices of your Property'});
});

router.get('/listings-list', passport.authenticationMiddleware(), function(req, res) {
  res.render('listings-list', { title:'Find the best places to advertise in adsbowl'});
});
router.get('/my-profile', passport.authenticationMiddleware(), function(req, res) {
  res.render('my-profile', { title:'Connect with numerous of advertisers in adsbowl'});
});
router.get('/change-password', passport.authenticationMiddleware(), function(req, res) {
  res.render('change-password', { title:'Sercure your password-Adsbowl'});
});
router.get('/my-properties', passport.authenticationMiddleware(), function(req, res) {
  res.render('my-properties', { title:'Find the best rates of property where you can advertise'});
});
router.get('/agents-list', passport.authenticationMiddleware(), function(req, res) {
  res.render('agent-list', { title:'Agents on adsbowl'});
});
router.get('/agents-page', passport.authenticationMiddleware(), function(req, res) {
  res.render('agent-page', { title:'Check out the profile of agents who can rent out your property on advertisement'});
});
module.exports = router;
