subCategories   = require('../../../controllers/subCategories')
express = require 'express' 
router  = express.Router();

router.route '/'
    .get subCategories.view
    .post subCategories.create
    .put subCategories.update
    .delete subCategories.delete
    
module.exports = router;