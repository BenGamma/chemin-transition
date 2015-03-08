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
    User.update({'token': req.headers['x-token'], 'email': req.headers['x-email']}, req.body, (err, review) ->
        if (err) 
            res.status(400).json('bad user')
        res.status(200).json('created');
    )

exports.delete = (req, res) ->
    User.findOne _id: req.body.id , (err, user) ->
        user.remove ->
            res.json 'message' : 'user deleted'

exports.profile = (req, res) ->
    res.render 'index', title : 'Blog | MVC'


exports.test =  (req, res) ->
    res.render 'index', title : 'Blog | MVC'