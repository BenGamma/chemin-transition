skills   = require('../../../controllers/skills')
express = require 'express' 
router  = express.Router();

router.route '/'
    # .get categories.view
    .post skills.create

module.exports = router;