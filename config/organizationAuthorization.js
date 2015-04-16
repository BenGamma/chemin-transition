var Organization, Skill, User, _, async;

User = require('../models/user');

Skill = require('../models/skill');

Organization = require('../models/organization');

_ = require('underscore');

async = require('async');

exports.checkOrganization = function(req, res, next) {
  return User.findOne({
    'local.token': req.headers['x-token'],
    'local.email': req.headers['x-email']
  }, function(err, user) {
    if (!(user && parseInt(user._id) === parseInt(req.params.organization))) {
      return res.status('401').json('Unauthorized access');
    } else {
      return next();
    }
  });
};

exports.addSkills = function(req, res, next) {
    var newSkills, skills;
    skills = [];
    newSkills = [];
    async.each(req.body.skills, function(skill, key) {
        if (skill._id) {
            return skills.push(skill._id);
        } else {
            req.body.skills.splice(key, 1);
            return newSkills.push(skill);
        }
    });
    async.each(newSkills, function(skill) {
        var object;
        object = new Skill({
            name: skill.name
        });
        object.save();
        return skills.push(object._id);
    });
    req.body.skills = skills;
  return next();
};
