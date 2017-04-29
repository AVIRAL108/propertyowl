const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var C = require('../constants');

const authenticationMiddleware = require('./middleware')
var models = require('../models');
var UserModel = models.User;

function findUser (username, callback) {
  UserModel.findOne({'user_id' : username}, function(err, user){
    if(err) return callback(null);
    if(user){
      return callback(null, user);
    } else{
      return callback(null);
    }
  });
}

passport.serializeUser(function (user, cb) {
  cb(null, user.user_id);
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


  passport.use('google', new GoogleStrategy({
        clientID        : C.config.googleAuth.clientID,
        clientSecret    : C.config.googleAuth.clientSecret,
        callbackURL     : C.config.googleAuth.callbackURL,
    }, function(token, refreshToken, profile, done){
        process.nextTick(function(){
           UserModel.findOne({'google.id' : profile.id}, function(err, user){
                if(err) return done(err);
                if(user){
                    return done(null, user);
                } else {
                    var newUser = new UserModel();
                    newUser.user_id = profile.id;
                    newUser.display_name = profile.displayName;
                    newUser.user_type = 'google';
                    newUser.google = {};
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName;
                    newUser.google.email = profile.emails[0].value;

                    newUser.save(function(err){
                        if(err) throw err;
                        return done(null, newUser);
                    });
                }
           }); 
        });
    }));

  passport.use('facebook', new FacebookStrategy({
        clientID        : C.config.facebookAuth.clientID,
        clientSecret    : C.config.facebookAuth.clientSecret,
        callbackURL     : C.config.facebookAuth.callbackURL
  }, function(token, refreshToken, profile, done){
        process.nextTick(function(){
          UserModel.findOne({ 'facebook.id' : profile.id}, function(err, user){
            if(err) return done(err);
            if(user){
              return done(null, user);
            } else {
              console.log(profile);
              console.log(token);
              console.log(refreshToken);

              var newUser = new UserModel();
              newUser.user_id = profile.id;
              newUser.display_name = profile['_json'].name;
              newUser.user_type = 'facebook';
              newUser.facebook = {};
              newUser.facebook.id    = profile.id; // set the users facebook id                   
              newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
              newUser.facebook.name  = profile['_json'].name; // look at the passport user profile to see how names are returned
              newUser.save(function(err){
                if(err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
  }));
}

module.exports = initPassport
