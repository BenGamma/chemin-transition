User                 = require '../models/user'
OrganizationPerson   = require '../models/organizationPerson'
mongoose             = require 'mongoose'
async                = require 'async'

exports.addActor = (req, res, next) ->
    actor = 
        organization: req.params.organization,
        person: req.params.person,
        actor: true

    query = OrganizationPerson.where(actor)

    async.waterfall([
        (callback) ->
            query.findOne (err, result) ->

                unless result
                    return callback(null, true)

                callback(null, false)
    ],
    (err, results) ->
        unless results
            res.status(400).json('already exist')


        organizationPerson = new OrganizationPerson(actor)
            
        organizationPerson.save (err, result) ->
            if (err)
                res.status(400).json(err)

            res.status(201).json('created')
    )

exports.removeActor = (req, res, next) ->
    OrganizationPerson.remove req.params.id, (err) ->
        if (err)
            res.status(404).json(err);

        res.status(204)