var userCtrl = require("./user/user.js");
var sandpitCtrl = require("./sandpit/sandpit.js");
var eventCtrl = require("./events/events.js");


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
    //app.get("/listSandpits", sandpit.listSandpits);
    //app.post("/removeSandpit", sandpit.removeSandpit);

    //Events request
    //app.get("/listEvents", event.listEvents);
    //app.post("/createEvent", event.createEvent);
    //app.post("/removeEvent", event.removeEvent);


    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/admin.html'); // Carga única de la vista
    });
};
