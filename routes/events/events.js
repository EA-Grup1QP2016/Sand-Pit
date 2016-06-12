/**
 * Here goes all the methods related to events
 */

var LOG_TAG = "events.js -->    ";
var db = require("../database/database.js");
var utils = require("../utils/utils.js");

function createEvent(req, res) {
    console.log(LOG_TAG, "Create event.");
    var data = {
        "name": req.body.name,
        "date": req.body.date,
        "description": req.body.description,
        "duration": req.body.duration,
        "creator": req.body.creator, //emails creator
        "location": req.body.location //sandpits name
    };
    db.createEventDB(data, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function eventSubscription(req, res){
    console.log(LOG_TAG, "Event Subscription");
    var data = {
        "user" : req.body.email,
        "event" : req.body.event
    };
    db.eventSubscriptionDB(data, function (state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    })
}

function eventUnsubscription(req, res){
    console.log(LOG_TAG, "Event Unsubscription");
    var data = {
        "user" : req.body.email,
        "event" : req.body.event
    };
    db.eventUnsubscriptionDB(data, function (state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    })
}

function listEvents(req, res) {
    console.log(LOG_TAG, "List events.");
    db.listEventsDB(function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function listEventsBySandPit(req, res) {
    console.log(LOG_TAG, "List events.");
    db.listEventsBySandPitDB(req.body.sandpit, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function listEventsByCreator(req, res) {
    console.log(LOG_TAG, "List events.");
    db.listEventsByCreatorDB(req.body.creator, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function removeEvent(req, res){
    console.log(LOG_TAG, "Remove Event");
    var name = {
        "name": req.body.name,
        "user": req.body.user
    };

    db.removeEventDB(name, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function listUserEvents(req, res) {
    console.log(LOG_TAG, "listUserEvents");

    var user = req.body.user;
    db.listUserEventsDB(user, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

var Event= require("../../schemas/event.js");
exports.updateEvent = function(req,res){
    Event.update({_id : req.params.event_id}, {$set:{name: req.body.name, description: req.body.description, date: req.body.date, duration: req.body.duration}}, function (err,event){
            if (err){
                res.send(err);
            }
            //Obtengo y devuelvo todos los Eventos tras borrar uno de ellos
            Event.find(function(err,event){
                if(err){
                    res.send(err)
                }
                res.json(event)
            });
        }

    );
};

module.exports.createEvent = createEvent;
module.exports.listEvents = listEvents;
module.exports.removeEvent = removeEvent;
module.exports.eventSubscription = eventSubscription;
module.exports.eventUnsubscription = eventUnsubscription;
module.exports.listEventsBySandPit = listEventsBySandPit;
module.exports.listEventsByCreator = listEventsByCreator;
module.exports.listUserEvents = listUserEvents;
