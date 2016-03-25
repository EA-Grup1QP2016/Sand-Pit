var user = require("./user/user.js");

module.exports = function(app) {
    /**
     * Generic Pages
     */
    
    //User request
    app.post("/createUser", user.createUser);
    app.post("/loginUser", user.loginUser);
    app.get("/listUsers", user.listUsers);
    app.post("/removeUser", user.removeUser);
}