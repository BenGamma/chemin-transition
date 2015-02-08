passport      = require 'passport'

exports.login = (req, res, next) ->
    unless req.body.email || req.body.password
        res.status(400).json(message : 'no params')

    passport.authenticate('local-login', (code, user, message) ->
        if user
            res.status(200).json(user)
            
        res.status(400).json(message)
    )(req, res, next)
