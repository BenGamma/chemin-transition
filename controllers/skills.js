var Skill;

Skill = require('../models/skill');

/**
 * [create skill]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.create = function(req, res, next) {
    var skill;
    if (req.body) {
        if (req.body.name === 'test') {
            return res.status(400).json('skill name cannot be equal to test');
        } else {
            skill = new Skill(req.body);
            skill.save(function(err, skill) {
                if (err) {
                    return res.status(400).json('wrong');
                }
                return res.status(200).json(skill);
            });
        }
    }
};

/**
 * [view show skill]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.view = function(req, res, next) {
    Skill.find(function(err, skills) {
        if (err) {
            return res.status(400).json('wrong');
        }
        return res.status(200).json(skills);
    });
};

/**
 * [update skill]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.update = function(req, res) {
    var skill;
    if (req.body) {
        if (req.body.id) {
            skill = req.body;
            Skill.findByIdAndUpdate(req.body.id, {name: req.body.name}, function(err, skill) {
                if (err) {
                    return res.status(400).json('wrong');
                }
                return res.status(200).json({
                    'message': 'skill updated'
                });
            });
        } else {
            return res.status(400).json('Id cannot be null');
        }
    }
};

/**
 * [delete skill]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.delete = function(req, res) {
    if (req.body.id) {
        Skill.findOne({ _id: req.body.id}, function(err, skill) {
            Skill.remove(function() {
                return res.json({
                    'message': 'skill deleted'
                });
            });
        });
    } else {
        return res.status(400).json('Id cannot be null');
    }
};
