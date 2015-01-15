var users = require('../../controllers/users')
var express = require('express');
var router = express.Router();

module.exports = function(passport){
    router.route('/')
        .post(passport.authenticate('local-signup'))
    ;
    return router;
};