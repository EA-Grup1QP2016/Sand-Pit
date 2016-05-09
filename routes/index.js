var userCtrl = require("./user/user.js");
var sandpitCtrl = require("./sandpit/sandpit.js");
var eventCtrl = require("./events/events.js");
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var middleware = require('../config/middleware.js');

module.exports = function (app) {

    // CRUD Users
    app.post('/user', userCtrl.createUser);
    app.get('/user', userCtrl.listUsers);
    app.put('/user/:user_id', isLoggedIn, userCtrl.updateUser);
    app.delete('/user/:user_id', isLoggedIn, userCtrl.removeUser);
    app.post("/login", userCtrl.loginUser);

    //CRUD de parques
    app.post('/sandpit', isLoggedIn, sandpitCtrl.createSandpits);
    app.get('/sandpit', sandpitCtrl.listSandpits);
    app.delete('/sandpit/:sandpit_id', isLoggedIn, sandpitCtrl.removeSandpit);

    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('hello', { title: 'OAuth example: facebook' });
    });

    //route for showing the profile page; only accessible after authentication
    router.get('/profile', function (req, res, next) {
        console.log('user information profile', req);
        res.send(req.user);
        //res.render('profile', {title: 'Your profile page', user: req.user});
    });

    //route for logging out
    router.get('/logout', function (req, res, next) {
        req.logout();
        res.redirect('/login');
    });

    //route for facebook authentication and login. See the list of permissions
    //(scopes): http://developers.facebook.com/docs/reference/login/
    router.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));
    router.get('/auth/twitter', passport.authenticate('twitter', {
        scope: ['public_profile', 'email']
    }));


    //handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/registro'
    }));
    router.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/registro'
    }));

    app.get('/*', function (req, res) {
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