require('./passport.js')(passport)
var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var C = require('../constants');

module.exports = function(passport){
/*
	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in mongo if a user with username exists or not
            User.findOne({ 'username' :  username }, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        })
    );*/

    passport.use('google', new GoogleStrategy({
        clientID        : C.config.googleAuth.clientID,
        clientSecret    : C.config.googleAuth.clientSecret,
        callbackURL     : C.config.googleAuth.callbackURL,
    }, function(token, refreshToken, profile, done){
        process.nextTick(function(){
           User.findOne({'google.id' : profile.id}, function(err, user){
                if(err) return done(err);
                if(user){
                    return done(null, user);
                } else {
                    var newUser = new User();
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


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}

