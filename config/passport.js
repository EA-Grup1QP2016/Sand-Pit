/*
 * Define passport strategies, i.e. what to do with the credentials
 * p y rovided by the OAuth provider
 */
var FacebookStrategy = require('passport-facebook').Strategy;
//var TwitterStrategy = require('passport-twitter).Strategy;

// load our auth.js config parameters
var configAuth = require('./auth');

module.exports = function(passport) {

// used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

// used to deserialize the user
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    //FACEBOOK STRATEGY
    passport.use(new FacebookStrategy({

//config parameters from our auth.js file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: configAuth.facebookAuth.profileFields
        },
//facebook will send back the token and profile to this
//callback function
        myFacebookStrategy)
    );

    //Twitter STRATEGY
    //passport.use(new TwitterStrategy({...

}; //end of module.exports = function(passport){


function myFacebookStrategy(token, refreshToken, profile, done) {
        // asynchronous
            process.nextTick(function() {
//Save profile info into newUser object
                var newUser = Object();
                newUser.id = profile.id;
                newUser.name = profile.displayName;
                newUser.email = profile.emails[0].value; //multiple emails provided
                newUser.pic = profile.photos[0].value; //url of the profile picture
                newUser.provider = profile.provider;
//Save the token for later actions with facebook (real actions
//will require using facebook API or Node SDK (authorized by this token)
//will require using facebook API or Node SDK (authorized by this token)
                newUser.token = token;
//Assume the user is authenticated
//newUser is made accessible through the session (req.user)
//jump back to passport.authenticate()
                return done(null, newUser);
        });
    }




