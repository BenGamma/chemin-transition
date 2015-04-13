User             = require('../models/user');
Skill            = require('../models/skill');
Organization     = require('../models/organization');
_                = require('underscore')
async            = require('async')

exports.checkOrganization = (req, res, next) ->
    User.findOne({'local.token' : req.headers['x-token'], 'local.email' : req.headers['x-email']},(err, user) ->
        unless user && parseInt(user._id) == parseInt(req.params.organization)
            res.status('401').json('Unauthorized access')
        else
            next();
    );

exports.addSkills = (req,res, next) ->
    skills = []
    newSkills = []
    async.each req.body.skills, (skill, key) ->
        if skill._id
            skills.push(skill._id)
        else
            req.body.skills.splice(key, 1)
            newSkills.push(skill)

    async.each newSkills, (skill) ->
        object = new Skill
            name: skill.name
        object.save()
        skills.push(object._id)
    req.body.skills = skills;
    next();