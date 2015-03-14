User                 = require '../models/user'
Organization         = require '../models/organization'
OrganizationPerson   = require '../models/organizationPerson'
Person               = require '../models/person'
#Skill                = require '../models/skill'
mongoose             = require 'mongoose'
async                = require 'async'
_                    = require 'underscore'

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

exports.addSkill = (req, res) ->


exports.show = (req, res) ->
    async.series(
        user:(callback) ->
            Organization.findById(req.params.organization)
                .populate('skills')
                .exec (err, organization) ->
                    if err || !organization
                        res.status(400).json('errors')
                    result = organization.serialize()
                    delete result['token']
                    callback(null, result)

        actors: (callback) ->
            OrganizationPerson.find()
                .where(organization: req.params.organization)
                .where(actor: true)
                .populate('person')
                .exec (err, actors) ->
                    if err
                        res.status(400).json('errors')
                    actors = OrganizationPerson.ArraySerialize(actors)
                    callback(null, actors)
    (err, results) ->
        result = results.user
        result.actors = results.actors
        res.status(200).json(result)
    )

exports.profile = (req, res) ->
    async.series(
        user: (callback) ->
            Organization.findOne()
                .where('local.token': req.headers['x-token'])
                .where('local.email': req.headers['x-email'])
                .populate('skills')
                .exec (err, organization) ->
                    if err || !organization
                        res.status(400).json('errors')
                    req.params.organization = organization._id
                    result = organization.serialize()
                    delete result['token']
                    callback(null, result)

        actors: (callback) ->
            OrganizationPerson.find()
                .where(organization: req.params.organization)
                .where(actor: true)
                .populate('person')
                .exec (err, actors) ->
                    if err
                        res.status(400).json('errors')
                    actors = OrganizationPerson.ArraySerialize(actors)
                    callback(null, actors)
    (err, results) ->
        result = results.user
        result.actors = results.actors
        res.status(200).json(result)
    )

exports.update = (req, res) ->
    Organization.findOne({'local.token': req.headers['x-token'], 'local.email': req.headers['x-email']}, (err, organization) ->
        organization.name           = req.body.name
        organization.local.email    = req.body.email
        organization.skills         = req.body.skills 
        unless _.isArray(req.body.coordinates)
            organization.coordinates    = req.body.coordinates
        organization.save()
        if (err) 
            res.status(400).json('error')
        res.status(200).json('updated');
    )


