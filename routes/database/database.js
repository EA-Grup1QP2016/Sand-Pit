/**
 * Here goes all the methods related to the database
 */
var LOG_TAG = "database.js -->    ";
var User = require("../../schemas/user.js");
var Sandpit = require("../../schemas/sandpit.js");

/**
 * Here goes all the methods related CRUD users
 */

function createUserDB(data, callback) {
    var newUser = User({
        email: data.email,
        fullName: data.fullName,
        location: data.location,
        password: data.password,
        admin: data.admin
    });
    User.findOne({ "email": data.email }, function(err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback (false, err);
        } else if (object !== null) {
            console.log(LOG_TAG, "The user already exists");
            callback (false, "The user already exists");
        } else {
            console.log(LOG_TAG, "The user doesn't exists in the database");
            newUser.save(newUser, function(error) {
                if (error) {
                    console.log(LOG_TAG, error);
                    callback (false, error);
                } else {
                    console.log(LOG_TAG, "User saved in database");
                    // Obtiene y devuelve todos los users tras crear uno
                    callback (true)
                }
            });
        }
    });
}

function loginDB(email, pwd, callback) {
    User.findOne({ $and: [{ email: email }, { password: pwd }] }, function(err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback (false, err);
        } else if (object === null) {
            console.log(LOG_TAG, "The user doesn't exists");
            callback (false, "The user doesn't exists");
        } else {
            console.log(LOG_TAG, "User Logged.");
            callback (true, object);
        }
    });
}

function listUsersDB(callback){
    User.find(function(err, object){
        if (err) {
            console.log(LOG_TAG, err);
            callback (false, err);
        } else if (object === null) {
            console.log(LOG_TAG, "The database is empty");
            callback (false, "The database is empty");
        } else {
            console.log(LOG_TAG, "UsersList");
            callback (true, object);
        }
    });
}

function removeUserDB(email, callback){
    User.remove({email:email}, function(err, object){
        if (err){
            console.log(LOG_TAG, err);
            callback (false, err);
        } else {
            console.log(LOG_TAG, "User removed successfully");
            callback (true);
        }
    });
}

/**
 * Here goes all the methods related CRUD sandpit
 */

function listSandpitsDB(callback){
    Sandpit.find(function(err, object){
        if (err) {
            console.log(LOG_TAG, err);
            callback (false, err);
        } else if (object === null) {
            console.log(LOG_TAG, "The database is empty");
            callback (false, "The database is empty");
        } else {
            console.log(LOG_TAG, "UsersList");
            callback (true, object);
        }
    });
}


function removeSandpitDB(name, callback){
    Sandpit.remove({name:name}, function(err, object){
        if (err){
            console.log(LOG_TAG, err);
            callback (false, err);
        } else {
            console.log(LOG_TAG, "User removed successfully");
            callback (true);
        }
    });
}


/**
 * Here goes all modules related User
 */

module.exports.createUserDB = createUserDB;
module.exports.loginDB = loginDB;
module.exports.listUsersDB = listUsersDB;
module.exports.removeUserDB = removeUserDB;


/**
 * Here goes all the modules related sandpit
 */

module.exports.listSandpitsDB = listSandpitsDB;
module.exports.removeSandpitDB = removeSandpitDB;