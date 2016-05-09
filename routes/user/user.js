/**
 * Here goes all the methods related to users
 */

var LOG_TAG = "users.js -->    ";
var db = require("../database/database.js");
var utils = require("../utils/utils.js");
var Hashes = require('jshashes');
var passport = require('../../config/service.js');

function createUser(req, res) {
    console.log(LOG_TAG, "Create user.");
    console.log(req.body);
    var passwordHash = new Hashes.SHA256(req.body.password).hex(req.body.password);
    var data = {
        "email": req.body.email,
        "password": passwordHash,
        "location": req.body.location,
        "fullName": req.body.fullName,
        "role": false  //turn it to true if you want to create a admin user
    };
    console.log(data);
    db.createUserDB(data, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function loginUser(req, res) {
    console.log(req.email)
    console.log(LOG_TAG, "Login user.");
    var passwordHash = new Hashes.SHA256(req.body.password).hex(req.body.password);
    var email = req.body.email;
    var pwd = passwordHash;
    db.loginDB(email, pwd, function(state, details) {
        if (state){
            passport.createToken(details);
        }
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function listUsers(req, res) {
    console.log(LOG_TAG, "List users.");
    db.listUsersDB(function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function removeUser(req, res){
    console.log(LOG_TAG, "Remove User");
    var id = req.params.user_id;
    db.removeUserDB(id, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function updateUser(req, res){
    console.log(LOG_TAG, "Update User");
    var id = req.params.user_id;
    var fullName = req.body.fullName;
    var location = req.body.location;
    var password = req.body.password;
    db.updateUserDB(id, fullName, location, password, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.listUsers = listUsers;
module.exports.removeUser = removeUser;
module.exports.updateUser = updateUser;