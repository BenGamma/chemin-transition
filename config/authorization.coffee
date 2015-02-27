passport = require('passport');
User     = require('../models/user');

exports.requiresLogin = (req, res, next) ->
    passport.tokenLogin(req, req.headers['x-token'], req.headers['x-email'], (code, message, user) ->
        unless user
            res.status(code).json message : message
        next();
    )

exports.checkLogin = (req, res, next) ->
    passport.tokenLogin(req, req.headers['x-token'], req.headers['x-email'], (code, message, user) ->
        unless user
            return res.status(401).json
                message : 'unauthorized'
        return res.status(204).json('accepted')
    )
