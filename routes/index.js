var userCtrl = require("./user/user.js");
var sandpitCtrl = require("./sandpit/sandpit.js");
var eventCtrl = require("./events/events.js");
var express = require('express');
var passport = require('passport');
var sandschema = require("../schemas/sandpit.js");

module.exports = function (app) {

    // CRUD Users
    app.post('/api/user', userCtrl.createUser);
    app.get('/api/user', userCtrl.listUsers);
    app.put('/api/user/:user_id', isLoggedIn, userCtrl.updateUser);
    app.delete('/api/user/:user_id', isLoggedIn, userCtrl.removeUser);
    app.post("/api/login", userCtrl.loginUser);
    app.get("/api/logout", function (req) {
        req.logout();
        req.session.destroy();
    });

    //CRUD de events
    app.post('/api/event', eventCtrl.createEvent);
    app.get("/api/event", eventCtrl.listEvents);
    app.post("/api/removeEvent", eventCtrl.removeEvent);
    app.post("/api/eventSubscription", eventCtrl.eventSubscription);
    app.post("/api/eventListBySandPit", eventCtrl.listEventsBySandPit);
    app.post("/api/eventListByCreator", eventCtrl.listEventsByCreator);
    
    app.get("/api/getUser", function(req, res){
        console.log(req.user);
        return res.send(req.user);
    });

    //CRUD de parques
    app.post('/api/sandpit', isLoggedIn, sandpitCtrl.createSandpits);
    app.get('/api/sandpit', sandpitCtrl.listSandpits);
    app.put('/api/sandpit/:sandpit_id', sandpitCtrl.updateSandpit);
    app.delete('/api/sandpit/:sandpit_id', isLoggedIn, sandpitCtrl.removeSandpit);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    app.post('/api/home', function (req, res) {

        // Grab all of the query parameters from the body.
        var lat = req.body.latitude;
        var long = req.body.longitude;
        var distance = req.body.distance;

        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = sandschema.find({});

        // ...include filter by Max Distance (converting miles to meters)
        if (distance) {

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({
                center: { type: 'Point', coordinates: [long, lat] },

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true
            });
        }

        // ... Other queries will go here ... 

        // Execute Query and Return the Query Results
        query.exec(function (err, sandpits) {
            if (err)
                res.send(err);

            // If no errors, respond with a JSON of all sandpits that meet the criteria
            res.json(sandpits);
        });
    });


    ////////////////////////////////////////////////////////////////////////////////////////////// 

    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('hello', { title: 'OAuth example: facebook' });
    });

    //route for showing the profile page; only accessible after authentication
    router.get('/api/profile', isLoggedIn, function (req, res, next) {
        console.log('user information profile', req);
        res.send(req.user);
        res.render('/home.html', {user: req.user});
    });

    //route for logging out
    router.get('/api/logout', function (req, res, next) {
        req.logout();
        res.redirect('/login');
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    app.get('/*', function (req, res) {
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