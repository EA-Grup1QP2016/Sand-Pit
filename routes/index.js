var express = require('express');
var router = express.Router();
var app = express();

var loadWebPage = require('./loadWebPage.js');
var user = require("./user/user.js");

/**
 * Generic Pages
 */
app.get("/login.html", loadWebPage.login);
app.get("", loadWebPage.login);
app.get("/register.html", loadWebPage.register);
app.post("/createUser", user.createUser);

module.export = router;