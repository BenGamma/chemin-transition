var users = require('../../../controllers/users')
var express = require('express');
var router = express.Router();

module.exports = function(passport){
    router.route('/')
        .post(passport.authenticate('local-signup'))
    ;

    router.route('/test')
        .get(users.test)
    return router;
};