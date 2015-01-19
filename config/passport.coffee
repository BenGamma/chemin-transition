LocalStrategy  = require('passport-local').Strategy;
#load up the user model
User = require('../models/user');

module.exports = (passport) ->

    passport.tokenLogin = (req, token, email, done) ->
        User.findOne({'local.token' : token, 'local.email' : email},(err, user) ->
            return done(401, 'Unauthorized access') unless user
            done(null, null, user)
        );

    passport.use 'local-signup', new LocalStrategy({
        #by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true, # allows us to pass back the entire request to the callback
    },
    (req, email, password, done) ->
        #asynchronous
        #User.findOne wont fire unless data is sent back
        process.nextTick ->
            #find a user whose email is the same as the forms email
            #we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, (err, user) ->
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
            );
    );