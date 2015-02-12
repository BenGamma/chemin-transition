express       = require('express')
router        = express.Router()
users         = require('./api/users');
sessions      = require('./api/sessions');
authorization = require('../authorization');
categories = require('./api/categories');
subCategories = require('./api/subCategories');
skills = require('./api/skills');

router.use '/users', users
router.use '/sessions', sessions 
router.use '/categories', categories
router.use '/subCategories', subCategories
router.use '/skills', skills

module.exports = router