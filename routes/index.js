<<<<<<< HEAD
var userCtrl = require("./user/user.js");
var sandpitCtrl = require("./sandpit/sandpit.js");
=======
var user = require("./user/user.js");
var sandpit = require("./sandpit/sandpit.js");
var event = require("./event/event.js");
>>>>>>> origin/master

module.exports = function(app) {

    // devolver todos los Users
    app.get('/user', userCtrl.listUsers); //On sandpit. es el controlador

    // Crear un nuevo User
    app.post('/user', userCtrl.createUser);

    // Modificar los datos de un User
    //app.put('/user/:user_id', userCtrl.updateUser);

    // Borrar un User
    //app.delete('/user/:user_id', userCtrl.removeUser);


    //Sandpit request
<<<<<<< HEAD
    //app.get("/listSandpits", sandpit.listSandpits);
    //app.post("/removeSandpit", sandpit.removeSandpit);

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/admin.html'); // Carga única de la vista
    });
};
=======
    app.get("/listSandpits", sandpit.listSandpits);
    app.post("/removeSandpit", sandpit.removeSandpit);
    
    //Events request
    app.get("/listEvents", event.listEvents);
    app.post("/createEvent", event.createEvent);
    app.post("/removeEvent", event.removeEvent);
}
>>>>>>> origin/master
