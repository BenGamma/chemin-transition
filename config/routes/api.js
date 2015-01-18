var express  = require('express');
var router   = express.Router();

var users    = require('./api/users');
var sessions = require('./api/sessions');
var authorization = require('../authorization');

router.use('/users', users);
router.use('/sessions', sessions);

module.exports = router