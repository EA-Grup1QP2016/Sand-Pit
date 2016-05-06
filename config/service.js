var jwt = require('jwt-simple');
var moment = require('moment');
var secret = require('./secret');

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, "days").unix()
    };
    return jwt.encode(payload, secret.TOKEN_SECRET);
};