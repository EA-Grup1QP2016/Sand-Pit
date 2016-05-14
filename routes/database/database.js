/**
 * Here goes all the methods related to the database
 */
var LOG_TAG = "database.js -->    ";
var User = require("../../schemas/user.js");
var Sandpit = require("../../schemas/sandpit.js");
var Event = require("../../schemas/event.js");

/**
 * Here goes all the methods related CRUD users
 */

function createUserDB(data, callback) {
    var newUser = User({
        email: data.email,
        fullName: data.fullName,
        location: data.location,
        password: data.password,
        role: data.role
    });
    User.findOne({"email": data.email}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object !== null) {
            console.log(LOG_TAG, "The user already exists");
            callback(false, "The user already exists");
        } else {
            console.log(LOG_TAG, "The user doesn't exists in the database");
            newUser.save(newUser, function (error) {
                if (error) {
                    console.log(LOG_TAG, error);
                    callback(false, error);
                } else { //Lista todos los usuarios incluyendo el nuevo
                    listUsersDB(function (state, details) {
                        console.log(LOG_TAG, "User saved in database");
                        callback(true, details);
                    });
                }
            });
        }
    });
}

function loginDB(email, pwd, callback) {
    User.findOne({$and: [{email: email}, {password: pwd}]}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object === null) {
            console.log(LOG_TAG, "The user doesn't exists");
            callback(false, "The user doesn't exists");
        } else {
            console.log(LOG_TAG, "User Logged.");
            callback(true, object);
        }
    });
}

function listUsersDB(callback) {
    User.find(function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object === null) {
            console.log(LOG_TAG, "The database is empty");
            callback(false, "The database is empty");
        } else {
            console.log(LOG_TAG, "UsersList");
            callback(true, object);
        }
    });
}

function removeUserDB(id, callback) {
    User.remove({_id: id}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else {
            listUsersDB(function (state, details) {
                console.log(LOG_TAG, "User deleted from database");
                callback(true, details);
            });
        }
    });
}

function updateUserDB(id, fullName, location, password, callback) {
    User.update({fullName: fullName}, {location: location}, {password: password}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else {
            listUsersDB(function (state, details) {
                console.log(LOG_TAG, "User updated in database");
                callback(true, details);
            });
        }
    });
}

/**
 * Here goes all the methods related CRUD sandpit
 */

function listSandpitsDB(callback) {
    var query = Sandpit.find({});
    query.exec(function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object === null) {
            console.log(LOG_TAG, "The database is empty");
            callback(false, "The database is empty");
        } else {
            console.log(LOG_TAG, "SandPit List");
            callback(true, object);
        }
    });
}

function createSandpitsDB(data, callback) {
    var newSandpit = new Sandpit(data);
    console.log(data.location[0]);
    var test = data.location[0];
    Sandpit.findOne({$and: [{"location[0]": newSandpit.location[0]}, {"location[1]": newSandpit.location[1]}]}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object !== null) {
            console.log(LOG_TAG, "An Sandpit with this location already exists, please change it");
            callback(false, "An Sandpit with this location already exists, please change it");
        } else {
            console.log(LOG_TAG, "The SandPit doesn't exists in the database");
            newSandpit.save(newSandpit, function (error) {
                if (error) {
                    console.log(LOG_TAG, error);
                    callback(false, error);
                } else {
                    console.log(LOG_TAG, "SandPit saved in the database");
                    callback(true)
                }
            });
        }
    })
}

function updateSandpitDB(id, name, description, price, callback) {
    Sandpit.update({name: name}, {description: description}, {price: price}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else {
            listSandpitsDB(function (state, details) {
                console.log(LOG_TAG, "Sandpit updated in database");
                callback(true, details);
            });
        }
    });
}


function removeSandpitDB(id, callback) {
    Sandpit.remove({_id: id}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else {
            listSandpitsDB(function (state, details) {
                console.log(LOG_TAG, "Sandpit deleted from database");
                callback(true, details);
            });
        }
    });
}
/**
 * Here goes all the methods related CRUD events
 */

function createEventDB(data, callback) {
    if (data.date <= Date()) {
        callback(false, "You can't create a event in the past, at least if you don't have a deLorean");
    }
    var newEvent = Event({
        name: data.name,
        date: data.date,
        description: data.description,
        duration: data.duration,
        creator: req.body.creator,
        location: req.body.location
    });
    Event.findOne({"name": data.name}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object !== null) {
            console.log(LOG_TAG, "An event with this name already exists, please change it");
            callback(false, "An event with this name already exists, please change it");
        } else {
            console.log(LOG_TAG, "The event doesn't exists in the database");
            newEvent.save(newEvent, function (error) {
                if (error) {
                    console.log(LOG_TAG, error);
                    callback(false, error);
                } else {
                    console.log(LOG_TAG, "Event saved in the database");
                    callback(true)
                }
            });
        }
    });
}

function listEventsDB(callback) {
    Event.find(function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object === null) {
            console.log(LOG_TAG, "The database is empty");
            callback(false, "The database is empty");
        } else {
            console.log(LOG_TAG, "EventsList");
            callback(true, object);
        }
    });
}

function removeEventDB(name, callback) {
    Event.remove({name: name}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else {
            console.log(LOG_TAG, "Event removed successfully");
            callback(true);
        }
    });
}


/**
 * Here goes all modules related to users
 */

module.exports.createUserDB = createUserDB;
module.exports.loginDB = loginDB;
module.exports.listUsersDB = listUsersDB;
module.exports.removeUserDB = removeUserDB;
module.exports.updateUserDB = updateUserDB;


/**
 * Here goes all the modules related to sandpits
 */

module.exports.listSandpitsDB = listSandpitsDB;
module.exports.removeSandpitDB = removeSandpitDB;
module.exports.updateSandpitDB = updateSandpitDB;
module.exports.createSandpitsDB = createSandpitsDB;

/**
 * Here goes all the modules related to events
 */

module.exports.createEventDB = createEventDB;
module.exports.listEventsDB = listEventsDB;
module.exports.removeEventDB = removeEventDB;
