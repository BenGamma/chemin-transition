var User, passport;

passport = require('passport');

User = require('../models/user');

exports.requiresLogin = function(req, res, next) {
  return passport.tokenLogin(req, req.headers['x-token'], req.headers['x-email'], function(code, message, user) {
    if (!user) {
      return res.status(code).json({
        message: message
      });
    } else {
      return next();
    }
  });
};

exports.checkLogin = function(req, res, next) {
  return passport.tokenLogin(req, req.headers['x-token'], req.headers['x-email'], function(code, message, user) {
    if (!user) {
      return res.status(401).json({
        message: 'unauthorized'
      });
    }
    return res.status(200).json(user.serialize());
  });
};
