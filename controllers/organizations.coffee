User                 = require '../models/user'
OrganizationPerson   = require '../models/organizationPerson'
mongoose             = require 'mongoose'

exports.addActor = (req, res, next) ->
    organizationPerson = new OrganizationPerson
        organization: req.params.organization,
        person: req.params.person,
        actor: true
        
    organizationPerson.save (err, result) ->
        if (err)
            res.status(400).json(err)

        res.status(201).json('created');

exports.removeActor = (req, res, next) ->
    OrganizationPerson.remove req.params.id, (err) ->
        if (err)
            res.status(404).json(err);

        res.status(204)