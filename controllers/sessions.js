var User, passport;

passport = require('passport');

User = require('../models/user');

exports.login = function(req, res, next) {
  if (!(req.body.email || req.body.password)) {
    res.status(400).json({
      message: 'no params'
    });
  }
  return passport.authenticate('local-login', function(user) {
    if (user) {
      console.log(user.serialize());
      return res.status(200).json(user.serialize());
    } else {
      return res.status(400).json('wrong');
    }
  })(req, res, next);
};
