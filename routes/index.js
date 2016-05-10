var userCtrl = require("./user/user.js");
var sandpitCtrl = require("./sandpit/sandpit.js");
var eventCtrl = require("./events/events.js");
var express = require('express');
var passport = require('passport');

module.exports = function (app) {

    // CRUD Users
    app.post('/api/user', userCtrl.createUser);
    app.get('/api/user', userCtrl.listUsers);
    app.put('/api/user/:user_id', isLoggedIn, userCtrl.updateUser);
    app.delete('/api/user/:user_id', isLoggedIn, userCtrl.removeUser);
    app.post("/api/login", userCtrl.loginUser);
    app.get("/api/logout", function(req){
        req.logout();
        req.session.destroy();
    });

    //CRUD de parques
    app.post('/api/sandpit', isLoggedIn, sandpitCtrl.createSandpits);
    app.get('/api/sandpit', sandpitCtrl.listSandpits);
    app.delete('/api/sandpit/:sandpit_id', isLoggedIn, sandpitCtrl.removeSandpit);
    
    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('hello', { title: 'OAuth example: facebook' });
    });

    //route for showing the profile page; only accessible after authentication
    router.get('/api/profile', isLoggedIn, function (req, res, next) {
        console.log('user information profile', req);
        res.send(req.user);
        //res.render('profile', {title: 'Your profile page', user: req.user});
    });

    //route for logging out
    router.get('/api/logout', function (req, res, next) {
        req.logout();
        res.redirect('/login');
    });

    //route for facebook authentication and login. See the list of permissions
    //(scopes): http://developers.facebook.com/docs/reference/login/
    router.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));
    router.get('/api/auth/twitter', passport.authenticate('twitter', {
        scope: ['public_profile', 'email']
    }));


    //handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback', passport.authenticate('facebook', function(err, user){
        console.log('datos user', user);
        if (err){
            res.send(err);
            return;
        }
        req.login(user, function(error){
            if (error){
                res.send(error);
                return;
            }
            res.send(null, user);
        })
    })
    );
    //(req, res)
    router.get('/api/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/api/',
        failureRedirect: '/api/registro'
    }));

    app.get('/*', function(req, res){
        console.log("********************** API URL ");
        res.redirect("/");
    });

    app.use('/', router);
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}