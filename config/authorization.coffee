passport = require('passport');
User     = require('../models/user');

exports.requiresLogin = (req, res, next) ->
    passport.tokenLogin(req, req.headers.token, req.headers.email, (code, message, user) ->
        unless user
            res.status(code);
            return res.json
                message : message
        next();
    )

exports.checkLogin = (req, res, next) ->
    passport.tokenLogin(req, req.headers.token, req.headers.email, (code, message, user) ->
        unless user
            res.status(code).json
                message : message
        res.status(code).json('accepted')
    )
