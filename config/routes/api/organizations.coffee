organizations        = require('../../../controllers/organizations')
actorAuthorization   = require '../../organizationAuthorization'
express              = require 'express' 
router               = express.Router()

router.route '/actor/:organization/:person'
    .post(actorAuthorization.checkOrganization, organizations.addActor)

router.route '/actor/:id'
    .delete organizations.removeActor

module.exports = router;