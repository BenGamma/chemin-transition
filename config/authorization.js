var passport = require('passport');
var User     = require('../models/user');

exports.requiresLogin = function(req, res, next) {
    passport.tokenLogin(req, req.headers.token, req.headers.email, function(code, message, user){
        if(!user) {
            res.status(code);
            return res.json({'message' : message});
        }
        next();
    });
};

