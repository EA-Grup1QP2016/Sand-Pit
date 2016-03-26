var user = require("./user/user.js");
var sandpit = require("./sandpit/sandpit.js");
var event = require("./event/event.js");

module.exports = function(app) {
    /**
     * Generic Pages
     */
    
    //User request
    app.post("/createUser", user.createUser);
    app.post("/loginUser", user.loginUser);
    app.get("/listUsers", user.listUsers);
    app.post("/removeUser", user.removeUser);

    //Sandpit request
    app.get("/listSandpits", sandpit.listSandpits);
    app.post("/removeSandpit", sandpit.removeSandpit);
    
    //Events request
    app.get("/listEvents", event.listEvents);
    app.post("/createEvent", event.createEvent);
    app.post("/removeEvent", event.removeEvent);
}