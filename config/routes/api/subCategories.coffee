subCategories   = require('../../../controllers/subCategories')
express = require 'express' 
router  = express.Router();

router.route '/'
    # .get categories.view
    .post subCategories.create

module.exports = router;