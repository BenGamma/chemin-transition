passport = require 'passport'
User     = require '../models/user'
Person   = require '../models/person'
fs       = require 'fs'
busboy   = require 'connect-busboy'

exports.create = (req, res, next) ->
    passport.authenticate('local-signup', (user) ->
        if user
            res.status(201).json(user)
        else
            res.status(400).json('fail')

    )(req, res, next)

exports.upload = (req, res, next) ->
    req.pipe(req.busboy)
    req.busboy.on 'file', (fieldname, file, filename) ->
        User.findById req.params.id, (err, user) ->
            if err
                res.status(400).json('bad user')
            try
                fs.mkdirSync('./public/files/user-'+user._id);
            catch e
            fstream = fs.createWriteStream('./public/files/user-'+user._id+'/'+filename);
            file.pipe(fstream)
            fstream.on 'close', ->
                user.image = '/files/user-'+user._id+'/'+filename
                user.save()
                res.status(200).json(user.image)

exports.update = (req, res) ->
    User.update({'token': req.headers['x-token'], 'email': req.headers['x-email']}, req.body, (err, review) ->
        if (err) 
            res.status(400).json('bad user')
        res.status(200).json('created');
    )

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


exports.persons =  (req, res) ->
    Person.find (err, persons) ->
        res.status(200).json(Person.ArraySerialize(persons))
