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
    req.body.skills = [
        "550196ede648b51a29cae837"
    ]

    Organization.findById("5500428721dbf7e3170c165c")
        .exec (err, organization) ->
            result = false
            async.each req.body.skills, (skill) ->
                async.each organization.skills, (orgSkill) ->
                    if skill.toString() == orgSkill.toString()
                       result = true
                       return true
                unless result
                    organization.skills.push(skill)

            organization.save()
            res.status(200).json('accepted')


exports.show = (req, res) ->
    async.parallel(
        organization:(callback) ->
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
                .where(person: req.params.organization)
                .where(actor: true)
                .populate('person')
                .exec (err, actors) ->
                    if err
                        res.status(400).json('errors')
                    actors = Person.ArraySerialize(actors)
                    callback(null, actors)
    (err, results) ->
    )

exports.profile = (req, res) ->
    async.parallel(
        user: (callback) ->
            Organization.findOne()
                .where('local.token': req.headers['x-token'])
                .where('local.email': req.headers['x-email'])
                .populate('skills')
                .exec (err, organization) ->
                    if err || !organization
                        res.status(400).json('errors')
                    result = organization.serialize()
                    delete result['token']
                    callback(null, result)

        actors: (callback) ->
            OrganizationPerson.find()
                .where(person: req.params.organization)
                .where(actor: true)
                .populate('person')
                .exec (err, actors) ->
                    if err
                        res.status(400).json('errors')
                    actors = Person.ArraySerialize(actors)
                    callback(null, actors)
    (err, results) ->
        result = results.user
        result.actors = results.actors
        res.status(200).json(result)
    )

exports.update = (req, res) ->
    Organization.update({'token': req.headers['x-token'], 'email': req.headers['x-email']}, req.body, (err, organization) ->
        if (err) 
            res.status(400).json('bad user')
        res.status(201).json('created');
    )


