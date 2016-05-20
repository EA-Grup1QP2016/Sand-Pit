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

//T0D0: Remove old Facebook
function myFacebookStrategy(token, refreshToken, profile, done) {
    process.nextTick(function () {
        console.log("facebook")
        User.findOne({ provider_id: profile.id }, function (err, user) {
            if (err) {
                return done(null, err)
            }
            if (!err && user != null) {
                return done(null, user);
            }

            console.log('profile data', profile);
            console.log(profile);

            // Al igual que antes, si el usuario ya existe lo devuelve
            // y si no, lo crea y salva en la base de datos
            var user = new User({
                fullName: profile.displayName,
                email: profile.emails[0].value,
                role: false //set it to true if you want to create an admin user
            });

            console.log('user info', user)
            user.save(function (err) {
                if (err) throw err;
                done(null, user);
            });
        });
        //Save profile info into newUser object
        var newUser = Object();
        newUser.name = profile.displayName;
        newUser.email = profile.emails[0].value;
        newUser.role = false;
        //Save the token for later actions with facebook (real actions
        //will require using facebook API or Node SDK (authorized by this token)
        //Assume the user is authenticated
        //newUser is made accessible through the session (req.user)
        //jump back to passport.authenticate()
        return done(null, newUser);
    });
}