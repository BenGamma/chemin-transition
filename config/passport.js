var LocalStrategy, Organization, Person, User;

LocalStrategy = require('passport-local').Strategy;

User = require('../models/user');

Person = require('../models/person');

Organization = require('../models/organization');

module.exports = function(passport) {
  passport.tokenLogin = function(req, token, email, done) {
    return User.findOne({
      'local.token': token,
      'local.email': email
    }, function(err, user) {
      if (!user) {
        return done(401, 'Unauthorized access');
      }
      return done(null, null, user);
    });
  };
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    return process.nextTick(function() {
      return User.findOne({
        'local.email': email
      }, function(err, user) {
        var newUser;
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, 'user already user', 400);
        } else {
          if (req.body.type === "Person") {
            newUser = new Person(req.body);
          } else {
            newUser = new Organization(req.body);
          }
          newUser.local = {
            "email": req.body.email,
            "password": req.body.password
          };
          newUser.local.password = newUser.generateHash(password);
          return newUser.save(function(err) {
            if (err) {
              return done(null, 'validations errors', 400);
            }
            return done(newUser, 'user created', 201);
          });
        }
      });
    });
  }));
  return passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    return User.findOne({
      'local.email': email
    }, function(err, user) {
      if (err) {
        return done(false);
      }
      if (!user) {
        return done(false);
      }
      if (!user.validPassword(password)) {
        return done(false);
      }
      return done(user);
    });
  }));
};
