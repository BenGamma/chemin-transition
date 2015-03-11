User                 = require '../models/user'
Organization         = require '../models/organization'
OrganizationPerson   = require '../models/organizationPerson'
mongoose             = require 'mongoose'
async                = require 'async'

exports.index = (req, res) ->
    Organization.find()
        .where('coordinates.lg').ne(null)
        .where('coordinates.lt').ne(null)
        .exec (err, organizations) ->
            if err
                res.status(400).json('errors')

            res.status(200).json(Organization.ArraySerialize(organizations))


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

exports.update = (req, res) ->
    Organization.update({'token': req.headers['x-token'], 'email': req.headers['x-email']}, req.body, (err, review) ->
        if (err) 
            res.status(400).json('bad user')
        res.status(200).json('created');
    )


