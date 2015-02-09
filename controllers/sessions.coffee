passport      = require 'passport'

exports.login = (req, res, next) ->
    unless req.body.email || req.body.password
        res.status(400).json(message : 'no params')

    passport.authenticate('local-login', (user) ->

        if user
            return res.status(200).json(user.serialize())
        else
            return res.status(400).json('wrong')
    )(req, res, next)
