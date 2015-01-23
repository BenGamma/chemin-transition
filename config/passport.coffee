LocalStrategy  = require('passport-local').Strategy

#load up the user model
User = require '../models/person'

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
                    return done 'message' : 'user already exist'
                else
                    #if there is no user with that email
                    #create the user
                    newUser = new User();

                    #set the user's local credentials
                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);
                    #save the user
                    newUser.save (err)->
                        throw err if err
                        done('user': newUser, 'message': 'created')
    #local login
    passport.use 'local-login', new LocalStrategy
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
    ,(req, email, password, done) ->
        User.findOne { 'local.email' :  email }, (err, user) ->
            #if there are any errors, return the error before anything else
            return done(400, false, 'no credentials') if err

            #if no user is found, return the message
            return done(400, false, 'wrong credentials') unless user

            #if the user is found but the password is wrong
            return done(400, false, 'wrong credentials') unless user.validPassword(password)

            #all is well, return successful user
            return done(200, user, 'success');
