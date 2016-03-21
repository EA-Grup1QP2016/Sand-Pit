/**
 * Here goes all the methods related to users
 */

var LOG_TAG = "users.js -->    ";
var db = require("../database/database.js");

function createUser(req, res) {
    console.log(LOG_TAG, "Create user.")
    var data = {
        "email": "email@mail.com", //req.body.email,
        "password": "secret",//req.body.password,
        "fullName": "This is a name",//req.body.fullName,
        "admin": false//req.body.admin
    };
    db.createUserDB(data, function(state, details) {
        if (state) {
            console.log(LOG_TAG, "Everything goes OK");
            res.json("Everithing goes OK");
        } else {
            console.log(LOG_TAG, "Something goes wrong");
            res.json("Something goes wrong", details);
        }
    })
}

function loginUser(req, res) {
    console.log(LOG_TAG, "Login user.")
    var email = "email@mail.com"; //req.body.email;
    var pwd = "secret"; //req.body.password;
    db.loginDB(email, pwd, function(state, details) {
        if (state) {
            console.log(LOG_TAG, "User logged", details);
            res.json("User logged", details);
        } else {
            console.log(LOG_TAG, "Something goes wrong");
            res.json("Something goes wrong", details);
        }
    });
}

function listUsers(req, res) {
    console.log(LOG_TAG, "List users.");
    db.listUsersDB(function(state, details) {
        if (state) {
            console.log(LOG_TAG, "Users list: \n", details);
            res.json("Users list:", details);
        } else {
            console.log(LOG_TAG, "Something goes wrong");
            res.json("Something  goes wrong", details);
        }
    });
}


function removeUser(req, res){
    console.log(LOG_TAG, "Remove User");
    var email = "email@mail.com";//req.body.email;
    db.removeUserDB(email, function(state, details) {
        if (state) {
            console.log(LOG_TAG, "Remove user:");
            res.json("Remove user");
        } else {
            console.log(LOG_TAG, "Something goes wrong");
            res.json("Something goes wrong", details);
        }
    });
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.listUsers = listUsers;
module.exports.removeUser = removeUser;