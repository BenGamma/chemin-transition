users         = require('../../../controllers/users')
authorization = require('../../authorization');
express       = require('express');
router        = express.Router();

router.route '/'
    .post users.create
    .put(authorization.requiresLogin)
    .delete(authorization.requiresLogin, users.delete)

router.route '/test'
    .get users.test 

module.exports = router;