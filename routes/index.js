var user = require("./user/user.js");
var sandpit = require("./sandpit/sandpit.js");
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

    //Sandpit request
    app.get("/listSandpits", sandpit.listSandpits);
    app.post("/removeSandpit", sandpit.removeSandpit);
    
    //Events request
    app.get("/listEvents", event.listEvents);
    app.post("/createEvent", event.createEvent);
    app.post("/removeEvent", event.removeEvent);
}