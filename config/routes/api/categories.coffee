categories    = require('../../../controllers/categories')
authorization = require '../../authorization'
express       = require 'express' 
router        = express.Router();

router.route '/'
    .get categories.view
    .post categories.create
    .put categories.update
    .delete categories.delete
    
module.exports = router;