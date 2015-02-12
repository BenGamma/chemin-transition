categories   = require('../../../controllers/categories')
express = require 'express' 
router  = express.Router();

router.route '/'
    .get categories.view
    .post categories.create
    .put categories.update
    .delete categories.delete
    
module.exports = router;