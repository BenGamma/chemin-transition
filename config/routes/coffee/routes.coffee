home          = require('../../controllers/home')
express       = require('express')
router        = express.Router()

router.route '/'
    .get home.index

module.exports = router