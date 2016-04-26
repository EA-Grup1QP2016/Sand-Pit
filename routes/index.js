var userCtrl = require("./user/user.js");
var sandpitCtrl = require("./sandpit/sandpit.js");
var eventCtrl = require("./events/events.js");
var express = require('express');
var passport = require('passport');
var Sandpit = require("./sandpit.js");
var mongoose    = require('mongoose');


module.exports = function (app) {

    // devolver todos los Users
    app.get('/user', userCtrl.listUsers);

    // Crear un nuevo User
    app.post('/user', userCtrl.createUser);

    // Modificar los datos de un User
    app.put('/user/:user_id', userCtrl.updateUser);

    // Borrar un User
    app.delete('/user/:user_id', userCtrl.removeUser);

//listar y crear parques

    app.get('/sandpit', sandpitCtrl.listSandpits);

    app.post('/sandpit', sandpitCtrl.createSandpits);
        // POST Routes
        // --------------------------------------------------------
        // Provides method for saving new users in the db
        app.post('/sandpit', function(req, res){

            // Creates a new User based on the Mongoose schema and the post bo.dy
            var newsandpit = new Sandpit(req.body);

            // New User is saved in the db.
           newsandpit.save(function(err){
                if(err)
                    res.send(err);

                // If no errors are found, it responds with a JSON of the new user
                res.json(req.body);
            });
        });


    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('hello', {title: 'OAuth example: facebook'});
    });

    //route for showing the profile page; only accessible after authentication
    router.get('/profile', isAuth, function (req, res, next) {
        console.log('user information profile', req);
        res.send(req.user);
        //res.render('profile', {title: 'Your profile page', user: req.user});
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
        successRedirect: '/profile',
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

    app.use('/', router);
};



