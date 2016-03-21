/**
 * Here goes all the methods related to users
 */

var LOG_TAG = "users.js -->    ";
var db = require("../database/database.js");

function createUser(req, res){
    var data={
        "email" : req.body.email,
        "password" : req.body.password,
        "fullName" : req.body.fullName,
        "admin" : req.body.admin
    };
    console.log(LOG_TAG, data);
    db.createUserDB(data, function(state, details){
        if (state){
            console.log(LOG_TAG, "Everything goes OK");
            res.json("Everithing goes OK");
        }else{
            console.log(LOG_TAG, "Something goes wrong");
            res.json("Something goes wrong", details);
        }
    })
}

module.exports.createUser = createUser;