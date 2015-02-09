LocalStrategy  = require('passport-local').Strategy

#load up the user model
User         = require '../models/user'
Person       = require '../models/person'
Organization = require '../models/organization'

module.exports = (passport) ->

    passport.tokenLogin = (req, token, email, done) ->
        User.findOne({'local.token' : token, 'local.email' : email},(err, user) ->
            return done(401, 'Unauthorized access') unless user
            done(null, null, user)
        );

    #local signup
    passport.use 'local-signup', new LocalStrategy
        #override field
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true, # allows us to pass back the entire request to the callback
    ,(req, email, password, done) ->
        process.nextTick ->
            User.findOne 'local.email' :  email , (err, user) ->
                #if there are any errors, return the error
                return done(err) if err

                #check to see if theres already a user with that email
                if user 
                    return done(null, 'user already user', 400)
                else
                    #if there is no user with that email
                    #create the user
                    if req.body.type == "Person"
                        newUser = new Person();
                    else
                        newUser = new Organization();

                    #set the user's local credentials
                    newUser.local = req.body
                    newUser.local.password = newUser.generateHash(password);
                    #save the user
                    newUser.save (err)->
                        return done(null, 'validations errors', 400) if err
                        return done(newUser, 'user created', 201)
    #local login
    passport.use 'local-login', new LocalStrategy
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
    ,(req, email, password, done) ->

        User.findOne { 'local.email' :  email }, (err, user) ->
            #if there are any errors, return the error before anything else
            return done(false) if err

            #if no user is found, return the message
            return done(false) unless user

            #if the user is found but the password is wrong
            return done(false) unless user.validPassword(password)
            #all is well, return successful user
            return done(user);
