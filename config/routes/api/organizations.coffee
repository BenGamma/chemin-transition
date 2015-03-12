organizations        = require('../../../controllers/organizations')
actorAuthorization   = require '../../organizationAuthorization'
authorization        = require '../../authorization'
express              = require 'express' 
router               = express.Router()

router.route '/'
    .get(organizations.index)

router.route '/show'
	.get(organizations.show)

router.route '/actor/:organization/:person'
    .post(actorAuthorization.checkOrganization, organizations.addActor)

router.route '/addSkill'
	.post(organizations.addSkill)

router.route '/actor/:id'
    .delete(actorAuthorization.checkOrganization, organizations.removeActor)

router.route '/update'
    .put(authorization.requiresLogin, organizations.update)

module.exports = router;