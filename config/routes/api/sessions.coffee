sessions   = require('../../../controllers/sessions')
express = require 'express' 
router  = express.Router();

router.route '/login'
    .post sessions.login

module.exports = router;