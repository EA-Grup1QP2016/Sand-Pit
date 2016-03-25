/**
 * Here goes all the methods related to users
 */

var LOG_TAG = "users.js -->    ";
var db = require("../database/database.js");
var utils = require("../utils/utils.js");

function createUser(req, res) {
    console.log(LOG_TAG, "Create user.");
    console.log(req.body);
    var data = {
        "email": req.body.email,
        "password": req.body.password,
        "fullName": req.body.fullName,
        "admin": req.body.admin
    };
    db.createUserDB(data, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

function loginUser(req, res) {
    console.log(req.email)
    console.log(LOG_TAG, "Login user.")
    var email = req.body.email;
    var pwd = req.body.password;
    db.loginDB(email, pwd, function(state, details) {
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
    var email = req.body.email;
    db.removeUserDB(email, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.listUsers = listUsers;
module.exports.removeUser = removeUser;