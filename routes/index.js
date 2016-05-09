var userCtrl = require("./user/user.js");
var sandpitCtrl = require("./sandpit/sandpit.js");
var eventCtrl = require("./events/events.js");
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var middleware = require('../config/middleware.js');

module.exports = function (app) {

    // CRUD Users
    app.post('/api/user', userCtrl.createUser);
    app.get('/api/user', userCtrl.listUsers);
    app.put('/api/user/:user_id', middleware.ensureAuthenticated, userCtrl.updateUser);
    app.delete('/api/user/:user_id', middleware.ensureAuthenticated, userCtrl.removeUser);
    app.post("/api/login", userCtrl.loginUser);

    //CRUD de parques
    app.post('/api/sandpit', middleware.ensureAuthenticated, sandpitCtrl.createSandpits);
    app.get('/api/sandpit', sandpitCtrl.listSandpits);
    app.delete('/api/sandpit/:sandpit_id', middleware.ensureAuthenticated, sandpitCtrl.removeSandpit);
    
    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('hello', { title: 'OAuth example: facebook' });
    });

    //route for showing the profile page; only accessible after authentication
    router.get('/api/profile', middleware.ensureAuthenticated, function (req, res, next) {
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
    router.get('/api/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));
    router.get('/api/auth/twitter', passport.authenticate('twitter', {
        scope: ['public_profile', 'email']
    }));


    //handle the callback after facebook has authenticated the user
    router.get('/api/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/api/',
        failureRedirect: '/api/registro'
    }));
    router.get('/api/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/api/',
        failureRedirect: '/api/registro'
    }));

    app.get('/*', function(req, res){
        console.log("********************** API URL ");
        res.redirect("/api");
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


