/**
 * Here goes all the methods related to the database
 */
var LOG_TAG = "database.js -->    ";
var User = require("../../schemas/user.js");
var Sandpit = require("../../schemas/sandpit.js");
var Event = require("../../schemas/event.js");
var Hashes = require('jshashes');

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
    User.findOne({ "email": data.email }, function (err, object) {
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
    User.findOne({ $and: [{ email: email }, { password: pwd }] }, function (err, object) {
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
    User.remove({ _id: id }, function (err, object) {
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

function updateUserDB(email, fullName, oldPwd, newPwd, callback) {
    oldPwd = new Hashes.SHA256(oldPwd).hex(oldPwd);
    if (newPwd) {
        User.update({ $and: [{ email: email }, { password: oldPwd }] },
            {
                $set: {
                    fullName: fullName,
                    password: new Hashes.SHA256(newPwd).hex(newPwd)
                }
            }, function (err, user) {
                if (err) {
                    console.log(LOG_TAG, err);
                    callback(false, err);
                } else if (user === null) {
                    console.log(LOG_TAG, "Wrong password");
                    callback(false, "Wrong password");
                } else {
                    listUsersDB(function (state, details) {
                        console.log(LOG_TAG, "User updated in database");
                        callback(true, details);
                    });
                }
            });
    } else {
        User.update({ $and: [{ email: email }, { password: oldPwd }] },
            {
                $set: {
                    fullName: fullName
                }
            }, function (err, user) {
                if (err) {
                    console.log(LOG_TAG, err);
                    callback(false, err);
                } else if (user === null) {
                    console.log(LOG_TAG, "Wrong password");
                    callback(false, "Wrong password");
                } else {
                    listUsersDB(function (state, details) {
                        console.log(LOG_TAG, "User updated in database");
                        callback(true, details);
                    });
                }
            });
    }
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

function getSandpitByIDDB(id, callback) {
    Sandpit.findOne({ _id: id}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object === null) {
            console.log(LOG_TAG, "This sandpit doesn't exist");
            callback(false, "This sandpit doesn't exist");
        } else {
            console.log(LOG_TAG, "SandPit by id");
            callback(true, object);
        }
    });
}

function createSandpitsDB(data, callback) {
    var newSandpit = new Sandpit(data);
    console.log(data.location[0]);
    var test = data.location[0];
    Sandpit.findOne({ $and: [{ "location[0]": newSandpit.location[0] }, { "location[1]": newSandpit.location[1] }] }, function (err, object) {
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
    Sandpit.update({ name: name }, { description: description }, { price: price }, function (err, object) {
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
    Sandpit.remove({ _id: id }, function (err, object) {
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
        callback(false, "You can't create a event in the past");
    }
    var newEvent = Event({
        name: data.name,
        date: data.date,
        description: data.description,
        duration: data.duration,
        creator: data.creator,
        location: data.location
    });
    Event.findOne({ "name": data.name }, function (err, object) {
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
                    listEventsDB(function (state, details) {
                        console.log(LOG_TAG, "Event saved in database");
                        callback(true, details);
                    });
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

function listEventsBySandPitDB(sandpit, callback) {
    Event.find({ location: sandpit}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object === null) {
            console.log(LOG_TAG, "This park doesn't exist");
            callback(false, "This park doesn't exist");
        } else {
            console.log(LOG_TAG, "SandPit event list");
            callback(true, object);
        }
    });
}

function listEventsByCreatorDB(creator, callback) {
    Event.find({ creator: creator}, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object === null) {
            console.log(LOG_TAG, "This park doesn't exist");
            callback(false, "This park doesn't exist");
        } else {
            console.log(LOG_TAG, "SandPit event list");
            callback(true, object);
        }
    });
}

function removeEventDB(name, callback) {
    Event.remove({ name: name }, function (err, object) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else {
            listEventsDB(function (state, details) {
                console.log(LOG_TAG, "Event removed successfully");
                callback(true, details);
            });
        }
    });
}

function eventSubscriptionDB(data, callback) {
    Event.findOne({ name: data.event }, function (err, event) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (event === null) {
            console.log(LOG_TAG, "This event doesn't not exist");
            callback(false, "This event doesn't not exist");
        } else {
            console.log(event.users.length);
            var i = 0;
            while (i < event.users.length){
                if (event.users[i] === data.user){
                    console.log("This users is alredy registered in this event");
                    return callback(false, "This users is alredy registered in this event");
                }
                i++;
            }
            
            Event.update({ "name": data.event },
                {
                    $push:
                    { "users": data.user }
                },
                function (err, event) {
                    if (err) {
                        callback(false, error);
                    } else {
                        callback(true, event);
                    }
                })
        }
    });
}

function eventUnsubscriptionDB(data, callback) {
    Event.findOne({ name: data.event }, function (err, event) {
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (event === null) {
            console.log(LOG_TAG, "This event doesn't not exist");
            callback(false, "This event doesn't not exist");
        } else {
            console.log(event.users.length);
            var i = 0;
            while (i < event.users.length){
                if (event.users[i] === data.user){
                    Event.update({ "name": data.event },
                    {
                        $pull:
                        { "users": data.user }
                    },
                    function (err, event) {
                        if (err) {
                            callback(false, error);
                        } else {
                            callback(true, event);
                        }
                    })
                    return;
                }
                i++;
            }
            console.log("This user isn't registered in this event");
            callback(false, "This user isn't registered in this event");
        }
    });
}

function listUserEventsDB(user, callback){
    Event.find({users: user}, function(err, object){
        if (err) {
            console.log(LOG_TAG, err);
            callback(false, err);
        } else if (object.length === 0) {
            console.log(LOG_TAG, "This user isn't subscribed to any event");
            callback(false, "This user isn't subscribed to any event");
        } else {
            console.log(LOG_TAG, "Event List");
            callback(true, object);
        }
    })
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
module.exports.getSandpitByIDDB = getSandpitByIDDB;

/**
 * Here goes all the modules related to events
 */

module.exports.createEventDB = createEventDB;
module.exports.listEventsDB = listEventsDB;
module.exports.removeEventDB = removeEventDB;
module.exports.eventSubscriptionDB = eventSubscriptionDB;
module.exports.eventUnsubscriptionDB = eventUnsubscriptionDB;
module.exports.listEventsBySandPitDB = listEventsBySandPitDB;
module.exports.listEventsByCreatorDB = listEventsByCreatorDB;
module.exports.listUserEventsDB = listUserEventsDB;