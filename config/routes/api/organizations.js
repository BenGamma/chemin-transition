var actorAuthorization, authorization, express, organizations, router;

organizations = require('../../../controllers/organizations');

actorAuthorization = require('../../organizationAuthorization');

authorization = require('../../authorization');

express = require('express');

router = express.Router();

router.route('/').get(organizations.index);

router.route('/show/:organization').get(organizations.show);

router.route('/profile').get(authorization.requiresLogin, organizations.profile);

router.route('/actor/:organization/:person').post(actorAuthorization.checkOrganization, organizations.addActor);

router.route('/addSkill').post(organizations.addSkill);

router.route('/actor/:organization/:id').delete(actorAuthorization.checkOrganization, organizations.removeActor);

router.route('/update/:organization').put(authorization.requiresLogin, actorAuthorization.checkOrganization, actorAuthorization.addSkills, organizations.update);

module.exports = router;
