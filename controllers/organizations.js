var Organization, OrganizationPerson, Person, User, _, async, mongoose, Image, busboy, fs;

User               = require('../models/user');
Organization       = require('../models/organization');
OrganizationPerson = require('../models/organizationPerson');
Person             = require('../models/person');
Image              = require('../models/image');
mongoose           = require('mongoose');
async              = require('async');
_                  = require('underscore');
fs                 = require('fs');
busboy             = require('connect-busboy');

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

exports.removeImage = function(req, res) {
    Image.remove(req.params.id, function(err) {
        if (err) {
            return res.status(404).json(err);
        }
    });
    return res.status(204);
}
