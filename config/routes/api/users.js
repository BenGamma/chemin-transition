var users = require('../../../controllers/users');
var authorization = require('../../authorization');
var express = require('express');
var router = express.Router();

router.route('/')
    .post(users.create)
    .delete(authorization.requiresLogin, users.delete)
;

router.route('/test')
    .post(users.test)

module.exports = router;