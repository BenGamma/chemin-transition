users         = require('../../../controllers/users')
authorization = require('../../authorization');
express       = require('express');
router        = express.Router();

router.route '/'
    .post users.create
    .delete(authorization.requiresLogin, users.delete)

router.route '/test'
    .post users.test 

module.exports = router;