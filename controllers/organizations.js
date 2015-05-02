var Organization, OrganizationPerson, Person, User, _, async, mongoose, Image, busboy, fs;

var User               = require('../models/user');
var Organization       = require('../models/organization');
var OrganizationPerson = require('../models/organizationPerson');
var Person             = require('../models/person');
var Image              = require('../models/image');
var mongoose           = require('mongoose');
var async              = require('async');
var _                  = require('underscore');
var fs                 = require('fs');
var busboy             = require('connect-busboy');
var curlrequest        = require('curlrequest');
var techonmapJson      = require('../techonmapdatas')

exports.index = function(req, res) {
  return Organization.find().where('coordinates.lg').ne(null).where('coordinates.lt').ne(null).where('local.enable', true).populate('skills').exec(function(err, organizations) {
    if (err) {
      res.status(400).json('errors');
    }
    return res.status(200).json(Organization.ArraySerialize(organizations));
  });
};

exports.techonmapdatas = function(req, res) {
  // curlrequest.request({url :'http://techonmap.fr/api/resources/export', verbose: true}, function(err, data){
    // var data = JSON.parse(data);
    // var tierslieuArray = [];
    // for (var i = 0, j=data['features'].length ; i < j ; i++){
    //   if (data['features'][i]['properties']['category'] == 'Tiers-lieu'){
    //     tierslieuArray.push(data['features'][i]);
    //   }     
    // }
    // var techonmapdatas = JSON.(techonmapdatas);

    var tierslieuArray = Array();
    console.log(techonmapJson['features'].length);
    for (var i = 0, j = techonmapJson['features'].length ; i < j ; i++){
      if (techonmapJson['features'][i]['properties']['category'] == 'Tiers-lieu'){
        tierslieuArray.push(techonmapJson['features'][i]);
      }
    }
    for (var i = 0, j = tierslieuArray.length ; i < j ; i++){
      var obj = tierslieuArray[i];
      for(var key in obj){
          var attrName = key;
          console.log(attrName);
          console.log(attrValue);
          var attrValue = obj[key];
      }
    }
  
  return res.status(200).json(tierslieuArray);
    
  // });
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

exports.addImage = function(req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        var image = new Image();
        Organization.findOne({
            'local.token': req.headers['x-token'],
            'local.email': req.headers['x-email']
        }, function(err, organization) {
            var e, fstream;
            if (err) {
                res.status(400).json('bad user');
            }
            try {
                fs.mkdirSync('./public/files/organizations/'+organization._id+'');
            } catch (_error) {
                e = _error;
            }
            fstream = fs.createWriteStream('./public/files/organizations/'+ organization._id +'/' + filename);
            file.pipe(fstream);
            fstream.on('close', function() {
                image.url = '/files/organizations/'+ organization._id +'/' + filename;
                image.organization = organization;
                image.save();
                return res.status(200).json(image);
            });
        });
    });
}

exports.removeImage = function(req, res) {
    Image.remove(req.params.id, function(err) {
      if (err) {
        return res.status(404).json(err);
      }
    });
    return res.status(204);
}
