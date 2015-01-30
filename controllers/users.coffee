passport = require 'passport'
User     = require '../models/user'

exports.create = (req, res, next) ->
    passport.authenticate('local-signup', (user, message, code) ->
        if user
            res.status(201).json(user)
        else
            res.status(code).json(message)

    )(req, res, next)

exports.update = (req, res) ->
    res.render 'index', title : 'Blog | MVC'

exports.delete = (req, res) ->
    User.findOne _id: req.body.id , (err, user) ->
        user.remove ->
            res.json 'message' : 'user deleted'

exports.profile = (req, res) ->
    res.render 'index', title : 'Blog | MVC'


exports.test =  (req, res) ->
    res.render 'index', title : 'Blog | MVC'