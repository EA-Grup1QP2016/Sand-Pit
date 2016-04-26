/**
 * Here goes all the methods related to sandpits
 */

var LOG_TAG = "sandpit.js -->    ";
var db = require("../database/database.js");
var utils = require("../utils/utils.js");

function listSandpits(req, res) {
    console.log(LOG_TAG, "List users.");
    db.listSandpitsDB(function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function createSandpits(req, res) {
    console.log(LOG_TAG, "Create sandpit.");
    db.createSandpitsDB(function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function removeSandpit(req, res){
    console.log(LOG_TAG, "Remove User");
    var name = req.body.name;
    db.removeSandpitDB(name, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

module.exports.listSandpits = listSandpits;
module.exports.removeSandpit = removeSandpit;

module.exports.createSandpits = createSandpits;