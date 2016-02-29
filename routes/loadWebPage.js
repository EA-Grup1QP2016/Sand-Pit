var express = require('express');
var app = express();

var api = {
    login: function(req, res){
        res.render('login.html');
    },
    register: function(req,res){
        res.render('register.html');
    }//Add here the next ones
};

module.exports = api;