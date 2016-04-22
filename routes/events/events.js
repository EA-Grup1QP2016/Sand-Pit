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

function listEvents(req, res) {
    console.log(LOG_TAG, "List events.");
    db.listEventsDB(function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function removeEvent(req, res){
    console.log(LOG_TAG, "Remove Event");
    var name = req.body.name;
    db.removeEventDB(name, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

module.exports.createEvent = createEvent;
module.exports.listEvents = listEvents;
module.exports.removeEvent = removeEvent;