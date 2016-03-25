var user = require("./user/user.js");
var sandpit = require("./sandpit/sandpit.js");

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
}