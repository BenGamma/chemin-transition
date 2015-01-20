LocalStrategy  = require('passport-local').Strategy

#load up the user model
User = require '../models/user'

module.exports = (passport) ->

    passport.tokenLogin = (req, token, email, done) ->
        User.findOne({'local.token' : token, 'local.email' : email},(err, user) ->
            return done(401, 'Unauthorized access') unless user
            done(null, null, user)
        );

    passport.use 'local-signup', new LocalStrategy
        #override field
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true, # allows us to pass back the entire request to the callback
    ,(req, email, password, done) ->
        process.nextTick ->
            User.findOne 'local.email' :  email , (err, user) ->
                console.log('sss')
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