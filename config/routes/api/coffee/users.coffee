users         = require('../../../controllers/users')
authorization = require('../../authorization');
express       = require('express');
router        = express.Router();

router.route '/'
    .post users.create
    .put(authorization.requiresLogin)
    .delete(authorization.requiresLogin, users.delete)

router.route '/upload/image/:id'
    .post users.upload

router.route '/persons'
    .get(authorization.requiresLogin, users.persons)

module.exports = router;