/*
 * Define passport strategies, i.e. what to do with the credentials
 * p y rovided by the OAuth provider
 */
var User = require('../schemas/user.js');

var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

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
    passport.use(new TwitterStrategy({

//config parameters from our auth.js file
            consumerKey: configAuth.twitterAuth.consumerKey,
            consumerSecret: configAuth.twitterAuth.consumerSecret,
            callbackURL: configAuth.twitterAuth.callbackURL,
            //profileFields: configAuth.twitterAuth.profileFields
        },function(accessToken, refreshToken, profile, done) {
        User.findOne({provider_id: profile.id}, function(err, user) {
            if(err) throw(err);
            if(!err && user!= null) return done(null, user);

            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                name: profile.displayName,
                photo: profile.photos[0].value
            });
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));
//twitter will send back the token and profile to this
//callback function
//        myTwitterStrategy)
  //  );

}; //end of module.exports = function(passport){


function myFacebookStrategy(token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function () {

        User.findOne({provider_id: profile.id}, function (err, user) {
            if (err) throw(err);
            if (!err && user != null) return done(null, user);

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


    function myTwitterStrategy(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {

            User.findOne({provider_id: profile.id}, function(err, user) {
                if(err) throw(err);
                if(!err && user!= null) return done(null, user);

                console.log('profile data', profile);
                console.log(profile);

                // Al igual que antes, si el usuario ya existe lo devuelve
                // y si no, lo crea y salva en la base de datos
                var user = new User({
                    fullName		: profile.displayName,
                    email           : profile.emails[0].value,
                    role			: false //set it to true if you want to create an admin user
                });

                console.log('user info', user)
                user.save(function(err) {
                    if(err) throw err;
                    done(null, user);
                });
            });
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
