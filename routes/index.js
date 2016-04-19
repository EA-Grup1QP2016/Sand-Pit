var userCtrl = require("./user/user.js");
var sandpitCtrl = require("./sandpit/sandpit.js");
var eventCtrl = require("./events/events.js");
var express = require('express');
var passport = require('passport');

module.exports = function (app) {

    // devolver todos los Users
    app.get('/user', userCtrl.listUsers);

    // Crear un nuevo User
    app.post('/user', userCtrl.createUser);

    // Modificar los datos de un User
    app.put('/user/:user_id', userCtrl.updateUser);

    // Borrar un User
    app.delete('/user/:user_id', userCtrl.removeUser);

    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('hello', {title: 'OAuth example: facebook'});
    });

    //route for showing the profile page; only accessible after authentication
    router.get('/profile', isAuth, function (req, res, next) {
        res.render('profile', {title: 'Your profile page', user: req.user});
    });

    //route for logging out
    router.get('/logout', function (req, res, next) {
        req.logout();
        res.redirect('/');
    });

    //route for facebook authentication and login. See the list of permissions
    //(scopes): http://developers.facebook.com/docs/reference/login/
    router.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));
    //handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/facebook/profile',
        failureRedirect: '/'
    }));
    /* route middleware to check whether user is authenticated */
    function isAuth(req, res, next) {
        // if user is authenticated, go on
        if (req.isAuthenticated())
            return next();
        // otherwise, send her back to home
        res.redirect('/');
    }

    app.use('/facebook', router);
};



