<<<<<<< HEAD
var userCtrl = require("./user/user.js");
var sandpitCtrl = require("./sandpit/sandpit.js");
=======
var user = require("./user/user.js");
var sandpit = require("./sandpit/sandpit.js");
<<<<<<< HEAD
var event = require("./events/events.js");

module.exports = function(app) {
    /**
     * Generic Pages
     */
    
    //User request
    app.post("/createUser", user.createUser);
    app.post("/loginUser", user.loginUser);
    app.get("/listUsers", user.listUsers);
    app.post("/removeUser", user.removeUser);
    app.post("/updateUser", user.updateUser);
=======
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

>>>>>>> a56eb3593c39eeabcb8229eb74862f65eb9d9595

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
