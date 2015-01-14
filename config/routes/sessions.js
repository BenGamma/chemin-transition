var express = require('express');
var router = express.Router();
var sessions = require('../../controllers/sessions')

module.exports = function(passport){
    router.route('/')
        .post(sessions.login)
        .delete(sessions.logout)
    ;
    return router;
};