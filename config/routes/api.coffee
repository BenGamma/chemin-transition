express       = require('express')
router        = express.Router()
users         = require('./api/users');
sessions      = require('./api/sessions');
authorization = require('../authorization');

router.use '/users', users
router.use '/sessions', sessions 

module.exports = router