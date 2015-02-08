sessions   = require('../../../controllers/sessions')
authorization = require '../../authorization'
express = require 'express' 
router  = express.Router();

router.route '/login'
    .post sessions.login

router.route '/'
    .get authorization.checkLogin

module.exports = router;