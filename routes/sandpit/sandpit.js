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
    db.createSandpitsDB(req.body, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

//////////////////////////////////////////////////////////////editar usuario by Marc
var Sandpit= require("../../schemas/sandpit.js");
exports.updateSandpit = function(req,res){
    Sandpit.update({_id : req.params.sandpit_id}, {$set:{name: req.body.name,description: req.body.description,facilities: req.body.facilities, price: req.body.price}}, function (err,sandpit){
            if (err){
                res.send(err);
            }
            //Obtengo y devuelvo todos los usuarios tras borrar uno de ellos
            Sandpit.find(function(err,sandpit){
                if(err){
                    res.send(err)
                }
                res.json(sandpit)
            });
        }

    );
}
///////////////////////////////////////////////////////////////

// Update desabilitado por Marc
/*
function updateSandpit(req, res){
    console.log(LOG_TAG, "Update Sandpit");
    var id = req.params.sandpit_id;
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    db.updateSandpitDB(id, name, description, price, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}
*/


function removeSandpit(req, res){
    console.log(LOG_TAG, "Remove Sandpit");
    var id = req.params.sandpit_id;
    db.removeSandpitDB(id, function(state, details) {
        utils.sendResponse(LOG_TAG, state, details, res);
    });
}

module.exports.listSandpits = listSandpits;
module.exports.createSandpits = createSandpits;
//module.exports.updateSandpit = updateSandpit;
module.exports.removeSandpit = removeSandpit;


