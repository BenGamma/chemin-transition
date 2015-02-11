categories   = require('../../../controllers/categories')
authorization = require '../../authorization'
express = require 'express' 
router  = express.Router();

router.route '/'
    # .get categories.view
    .post categories.create

module.exports = router;