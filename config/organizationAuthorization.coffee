User     = require('../models/user');

exports.checkOrganization = (req, res, next) ->
    User.findOne({'local.token' : req.headers['x-token'], 'local.email' : req.headers['x-email']},(err, user) ->
        unless user && parseInt(user._id) == parseInt(req.params.organization)
            res.status('401').json('Unauthorized access')
        next();
    );