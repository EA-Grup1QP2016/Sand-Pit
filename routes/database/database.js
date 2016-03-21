/**
 * Here goes all the methos related to the database
 */
var LOG_TAG = "database.js -->    ";
var User = require("../../schemas/user.js");

function createUserDB(data) {
    var newUser = User();
    console.log(LOG_TAG, data);
    User.findOne({ "email": data.email }, function(err, obj) {
        if (err) {
            console.log(LOG_TAG, err);
            return (false, err);
        } else if (obj !== null) {
            console.log(LOG_TAG, err);
            return (false, "The user already exists");
        } else {
            console.log(LOG_TAG, "The user doesn't exists in the database");
            newUser.save(data, function(error) {
                if (error) {
                    console.log(LOG_TAG, error);
                    return (false, error);
                }else{
                    console.log(LOG_TAG, "User saved in database");
                    return (true)
                }
            });
        }
    });
}

module.exports.createUserDB = createUserDB;