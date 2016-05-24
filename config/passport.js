/*
 * Define passport strategies, i.e. what to do with the credentials
 * provided by the OAuth provider
 */
var User = require('../schemas/user.js');
var service = require('./service');

var FacebookStrategy = require('passport-facebook').Strategy;

// load our auth.js config parameters
var configAuth = require('./auth');

module.exports = function (passport) {

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

        // pull in our app id and secret from our auth.js file
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: configAuth.facebookAuth.profileFields

    },
    myFacebookStrategy)
    );
};

function myFacebookStrategy(token, refreshToken, profile, done) {
    process.nextTick(function () {
        console.log("facebook")
        User.findOne({ email: profile.emails[0].value }, function (err, user) {
            if (err) {
                return done(err)
            } else if (user != null) {
                console.log("User already exists in database, proceed to login");
                return done(false, user);
            }
            console.log("User doesn't exists, proceed to save");
            var user = new User({
                fullName: profile.displayName,
                email: profile.emails[0].value,
                role: false //set it to true if you want to create an admin user
            });

            user.save(function (err) {
                if (err){
                    return done (err);
                }
                done(false, user);
            });
        });
    });
}