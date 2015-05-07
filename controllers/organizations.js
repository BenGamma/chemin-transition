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

/**
 * [index fetch all orgnizations]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.index = function(req, res) {
    Organization.find()
        .where('coordinates.lg')
        .ne(null).where('coordinates.lt')
        .ne(null).where('local.enable', true)
        .populate('skills')
        .exec(function(err, organizations) {
            if (err) {
                return res.status(400).json('errors');
            }
            return res.status(200).json(Organization.ArraySerialize(organizations));
        }
    );
};

/**
 * [techonmapdatas fetch data from techonmap]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.techonmapdatas = function(req, res) {

    var tierslieuArray = Array();
    for (var i = 0, j = techonmapJson['features'].length ; i < j ; i++){
      if (techonmapJson['features'][i]['properties']['category'] == 'Tiers-lieu'){
        tierslieuArray.push(techonmapJson['features'][i]);
      }
    }
    for (var i = 0, j = tierslieuArray.length ; i < j ; i++){
      var obj = tierslieuArray[i];
      for(var key in obj){
          var attrName = key;
          var attrValue = obj[key];
      }
    }
  
  return res.status(200).json(tierslieuArray);
};

/**
 * [addActor add a new actor]
 * @param {[type]}   req  [description]
 * @param {[type]}   res  [description]
 * @param {Function} next [description]
 */
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
            async.waterfall([
                function(callback) {
                    query.findOne(function(err, result) {
                    if (!result) {
                        callback(null, true);
                    }
                    callback(null, false);
                });
            }], function(err, results) {
                var organizationPerson;
                if (!results) {
                    return res.status(400).json('already exist');
                }
                organizationPerson = new OrganizationPerson(actor);
                organizationPerson.save(function(err, result) {
                if (err) {
                    return res.status(400).json(err);
                }
                return res.status(201).json('created');
            });
        });
        } else {
            return res.status(400).json('Miss parameters');
        }
    }
};

/**
 * [removeActor remove actor]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.removeActor = function(req, res, next) {
    OrganizationPerson.remove(req.params.id, function(err) {
        if (err) {
            return res.status(404).json(err);
        }
    });
    return res.status(204);
};

/**
 * [show show an organization]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.show = function(req, res) {
    async.series({
        user: function(callback) {
            Organization.findById(req.params.organization)
                .populate('skills')
                .populate('images')
                .exec(function(err, organization) {
                var result;
                if (err || !organization) {
                    return res.status(400).json('errors');
                }
                result = organization.serialize();
                delete result['token'];
                callback(null, result);
            });
        },
        actors: function(callback) {
            OrganizationPerson.find().where({
                organization: req.params.organization
            }).where({
                actor: true
            }).populate('person').exec(function(err, actors) {
                if (err) {
                    res.status(400).json('errors');
                }
                actors = OrganizationPerson.ArraySerialize(actors);
                callback(null, actors);
            });
        }
    }, function(err, results) {
        var result;
        result        = results.user;
        result.actors = results.actors;
        return res.status(200).json(result);
    });
};

/**
 * [profile show organization profile]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.profile = function(req, res) {
    async.series({
        user: function(callback) {
            Organization
                .findOne()
                .where({'local.token': req.headers['x-token']})
                .where({'local.email': req.headers['x-email']})
                .populate('skills')
                .exec(function(err, organization) {
                    var result;
                    if (err || !organization) {
                        return res.status(400).json('errors');
                    }
                    req.params.organization = organization._id;
                    result = organization.serialize();
                    delete result['token'];
                    callback(null, result);
                }
            );
        },
        actors: function(callback) {
            OrganizationPerson
            .find()
            .where({ organization: req.params.organization })
            .where({ actor: true })
            .populate('person').exec(function(err, actors) {
                if (err) {
                    return res.status(400).json('errors');
                }
                actors = OrganizationPerson.ArraySerialize(actors);
                callback(null, actors);
            });
        }}, function(err, results) {
            var result;
            result = results.user;
            result.actors = results.actors;
            return res.status(200).json(result);
        }
    );
};

/**
 * [update organization]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.update = function(req, res) {
    Organization.findOne({
        'local.token': req.headers['x-token'],
        'local.email': req.headers['x-email']
    }, function(err, organization) {
        organization.name = req.body.name;
        organization.local.email = req.body.email;
        organization.skills = req.body.skills;
        organization.description = req.body.description;
        organization.url = req.body.url;
        organization.phone = req.body.phone;
        if (!_.isArray(req.body.coordinates)) {
            organization.coordinates = req.body.coordinates;
        }
        organization.save();
        if (err) {
            return res.status(400).json('error');
        }
        return res.status(200).json('updated');
    });
};

/**
 * [addImage add an image profile]
 * @param {[type]} req [description]
 * @param {[type]} res [description]
 */
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
                return res.status(400).json('bad user');
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

/**
 * [removeImage]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.removeImage = function(req, res) {
    Image.remove(req.params.id, function(err) {
        if (err) {
            return res.status(404).json(err);
        }
    });
    return res.status(204);
}
