organizations   = require('../../../controllers/organizations')
authorization   = require '../../authorization'
express         = require 'express' 
router          = express.Router()

router.route '/actor/:organization/:person'
    .post organizations.addActor

router.route '/actor/:id'
    .delete organizations.removeActor

module.exports = router;