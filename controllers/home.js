var passport;

passport = require('passport');

exports.index = function(req, res) {
  return res.render('index', {
    title: 'Blog | MVC'
  });
};
