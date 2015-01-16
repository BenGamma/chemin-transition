var express  = require('express');
var router   = express.Router();

var users    = require('./api/users');
var sessions = require('./api/sessions');
var authorization = require('../authorization');

module.exports = function(passport){
    router.route('*')
        .all(authorization.requiresLogin)
    ;
    router.use('/users', users(passport));
    router.use('/sessions', sessions(passport));
    return router;
};