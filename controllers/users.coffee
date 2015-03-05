passport = require 'passport'
User     = require '../models/user'

exports.create = (req, res, next) ->
    passport.authenticate('local-signup', (user) ->
        if user
            res.status(201).json(user)
        else
            res.status(400).json('fail')

    )(req, res, next)

exports.update = (req, res) ->
    res.render 'index', title : 'Blog | MVC'

exports.delete = (req, res) ->
    if req.body.id

        User.findOne _id: req.body.id , (err, user) ->
            if(user)
                user.remove ->
                    res.json 'message' : 'user deleted'
            else
                res.status(400).json('fail')
    else
        res.status(400).json('Id cannot be null')

exports.profile = (req, res) ->
    res.render 'index', title : 'Blog | MVC'


exports.test =  (req, res) ->
    res.render 'index', title : 'Blog | MVC'