var passport = require('passport');
var User     = require('../models/user');

exports.create = function(req, res, next){
    passport.authenticate('local-signup', function(message){
        res.json(message)
    })(req, res, next)
}

exports.update = function(req, res){
    res.render('index', {title : 'Blog | MVC'});
}

exports.delete = function(req, res){

    User.findOne({ _id: req.body.id }, function(err, user){
        user.remove(function(){
            res.json({
                'message': 'user deleted'
            })
        });
    });
}

exports.profile =  function(req, res){
    res.render('index', {title : 'Blog | MVC'});
}

exports.test =  function(req, res){
    res.render('index', {title : 'Blog | MVC'});
}