const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authenticationMiddleware = require('./middleware')
var models = require('../models');


function findUser (username, callback) {
  var UserModel = models.User;
  UserModel.findOne({email : username}, function(err, user){
    if(err) return callback(null);
    if(user){
      return callback(null, user);
    } else{
      return callback(null);
    }
  });
}

passport.serializeUser(function (user, cb) {
  cb(null, user.email)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})

function initPassport () {
   passport.authenticationMiddleware = authenticationMiddleware;
  passport.use(new LocalStrategy(
    function(username, password, done) {
      findUser(username, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        if (password !== user.password  ) {
          return done(null, false)
        }
        return done(null, user)
      })
    }
  ));
}

module.exports = initPassport
