var Person, User, busboy, fs, passport;

passport   = require('passport');
User       = require('../models/user');
Person     = require('../models/person');
Invitation = require('../models/invitation'); 
mailer     = require('../config/mailer');
fs         = require('fs');
busboy     = require('connect-busboy');

exports.create = function(req, res, next) {
    passport.authenticate('local-signup', function(user) {
        if (user) {
            return res.status(201).json(user);
        } else {
            res.status(400).json('fail');
        }
    })(req, res, next);
};

exports.upload = function(req, res, next) {
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        User.findById(req.params.id, function(err, user) {
            var e, fstream;
            if (err) {
                res.status(400).json('bad user');
            }
            try {
                fs.mkdirSync('./public/files/user-' + user._id);
            } catch (_error) {
                e = _error;
            }
            fstream = fs.createWriteStream('./public/files/user-' + user._id + '/' + filename);
            file.pipe(fstream);
            fstream.on('close', function() {
                user.image = '/files/user-' + user._id + '/' + filename;
                user.save();
                res.status(200).json(user.image);
            });
        });
    });
};

exports.update = function(req, res) {
    console.log(req.body)
    User.update({
        'token': req.headers['x-token'],
        'email': req.headers['x-email']
    }, req.body, function(err, review) {
        if (err) {
            res.status(400).json('bad user');
        }
        res.status(200).json('created');
    });
};

exports.delete = function(req, res) {
    if (req.body.id) {
        User.findOne({
            _id: req.body.id
        }, function(err, user) {
            if (user) {
                user.remove(function() {
                    res.json({
                        'message': 'user deleted'
                    });
                });
            } else {
                res.status(400).json('fail');
            }
        });
    } else {
        res.status(400).json('Id cannot be null');
    }
};

exports.profile = function(req, res) {
    res.render('index', {
        title: 'Blog | MVC'
    });
};

exports.persons = function(req, res) {
    Person.find(function(err, persons) {
        res.status(200).json(Person.ArraySerialize(persons));
    });
};

exports.invitation = function(req, res) {
    User.findOne({
        'local.token': req.headers['x-token'],
        'local.email': req.headers['x-email']
    }, function(err, user) {
        if(err) {
            res.status(404).json('errors');
        }
        var invitation = new Invitation({
            email: req.body.to,
            user: user,
            type: req.body.type
        });
        invitation.save();
        if (user.name) {
            req.body.html = "l'organisation "+user.name+ 'vous invite à vous inscrire sur les chemins de la transition<br/>';
        }else {
             req.body.html = user.firstName+' '+user.lastName+ 'vous invite à vous inscrire sur les chemins de la transition<br/>';
        }
        req.body.html += 'à cette adresse: http://'+req.headers.host+'/#/invitation/'+invitation._id+'<br/>';
        req.body.html += 'message:<br/>'
        req.body.html += req.body.text+'<br/>'
        mailer.sendMail(req.body, function(error, response){
            if(error){
                console.log(error);
                res.status(404).json(error);
            }else {
                res.status(201).json(invitation);
            }
        });
    });
}

exports.showInvitation = function(req, res) {
    Invitation.findById(req.params.id, function(err, invitation){
        if(err) {
            res.status(404).json('error');
        }else {
            res.status(200).json(invitation);
        }
    });
}

exports.checkInvitation = function(req, res, next) {
    Invitation.findOne()
        .where({'email': req.body.to})
        .exec(function(err, invitation){
            if(err) {
                res.status(500).json('error')
            }

            if (invitation) {
                res.status(400).json('email already send');
            }else {
                next();
            }
        }
    );
};
