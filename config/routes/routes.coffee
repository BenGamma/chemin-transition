home          = require('../../controllers/home')
express       = require('express')
router        = express.Router()

router.route '/'
    .get home.index

router.route '/partials/:filename'
    .get home.partials

module.exports = router