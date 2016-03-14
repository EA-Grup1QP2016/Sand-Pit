var express = require('express');
var router = express.Router();
var app = express();

var loadWebPage = require('./loadWebPage.js');

/**
 * Generic Pages
 */
app.get("/login.html", loadWebPage.login);
app.get("", loadWebPage.login);
app.get("/register.html", loadWebPage.register);

module.export = router;
module.export = app;