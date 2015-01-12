var users = require('../controllers/users')
var express = require('express');
var router = express.Router();

router.route('/')
    .post(users.create)
;

module.exports = router;