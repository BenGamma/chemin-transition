var Organization, OrganizationPerson, Person, User, _, async, mongoose;

User = require('../models/user');

Organization = require('../models/organization');

OrganizationPerson = require('../models/organizationPerson');

Person = require('../models/person');

mongoose = require('mongoose');

async = require('async');

_ = require('underscore');

exports.index = function(req, res) {
  return Organization.find().where('coordinates.lg').ne(null).where('coordinates.lt').ne(null).where('local.enable', true).populate('skills').exec(function(err, organizations) {
    if (err) {
      res.status(400).json('errors');
    }
    return res.status(200).json(Organization.ArraySerialize(organizations));
  });
};

exports.addActor = function(req, res, next) {
  var actor, query;
  if (req.body) {
    if (req.params.organization && req.params.person) {
      actor = {
        organization: req.params.organization,
        person: req.params.person,
        actor: true
      };
      query = OrganizationPerson.where(actor);
      return async.waterfall([
        function(callback) {
          return query.findOne(function(err, result) {
            if (!result) {
              return callback(null, true);
            }
            return callback(null, false);
          });
        }
      ], function(err, results) {
        var organizationPerson;
        if (!results) {
          res.status(400).json('already exist');
        }
        organizationPerson = new OrganizationPerson(actor);
        return organizationPerson.save(function(err, result) {
          if (err) {
            res.status(400).json(err);
          }
          return res.status(201).json('created');
        });
      });
    } else {
      return res.status(400).json('Miss parameters');
    }
  }
};

exports.removeActor = function(req, res, next) {
    OrganizationPerson.remove(req.params.id, function(err) {
      if (err) {
        return res.status(404).json(err);
      }
    });
    return res.status(204);
};

exports.addSkill = function(req, res) {};

exports.show = function(req, res) {
  return async.series({
    user: function(callback) {
      return Organization.findById(req.params.organization).populate('skills').exec(function(err, organization) {
        var result;
        if (err || !organization) {
          res.status(400).json('errors');
        }
        result = organization.serialize();
        delete result['token'];
        return callback(null, result);
      });
    },
    actors: function(callback) {
      return OrganizationPerson.find().where({
        organization: req.params.organization
      }).where({
        actor: true
      }).populate('person').exec(function(err, actors) {
        if (err) {
          res.status(400).json('errors');
        }
        actors = OrganizationPerson.ArraySerialize(actors);
        return callback(null, actors);
      });
    }
  }, function(err, results) {
    var result;
    result = results.user;
    result.actors = results.actors;
    return res.status(200).json(result);
  });
};

exports.profile = function(req, res) {
  return async.series({
    user: function(callback) {
      return Organization.findOne().where({
        'local.token': req.headers['x-token']
      }).where({
        'local.email': req.headers['x-email']
      }).populate('skills').exec(function(err, organization) {
        var result;
        if (err || !organization) {
          res.status(400).json('errors');
        }
        req.params.organization = organization._id;
        result = organization.serialize();
        delete result['token'];
        return callback(null, result);
      });
    },
    actors: function(callback) {
      return OrganizationPerson.find().where({
        organization: req.params.organization
      }).where({
        actor: true
      }).populate('person').exec(function(err, actors) {
        if (err) {
          res.status(400).json('errors');
        }
        actors = OrganizationPerson.ArraySerialize(actors);
        return callback(null, actors);
      });
    }
  }, function(err, results) {
    var result;
    result = results.user;
    result.actors = results.actors;
    return res.status(200).json(result);
  });
};

exports.update = function(req, res) {
  return Organization.findOne({
    'local.token': req.headers['x-token'],
    'local.email': req.headers['x-email']
  }, function(err, organization) {
    organization.name = req.body.name;
    organization.local.email = req.body.email;
    organization.skills = req.body.skills;
    if (!_.isArray(req.body.coordinates)) {
      organization.coordinates = req.body.coordinates;
    }
    organization.save();
    if (err) {
      res.status(400).json('error');
    }
    return res.status(200).json('updated');
  });
};
