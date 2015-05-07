var Category, async;

Category = require('../models/category');

async = require('async');

exports.view = function(req, res, next) {
    Category.find(function(err, categories) {
    if (err) {
        return res.status(400).json('wrong');
    }
    return res.status(200).json(categories);
  });
};

/**
 * [create create a new category]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.create = function(req, res, next) {
    if (req.body) {
        if (req.body.name) {
            if (req.body.name === 'test') {
                return res.status(400).json('category name cannot be equal to test');
            } else {
                async.waterfall([function(callback) {
                    Category.findOne({
                        name: req.body.name
                    }, function(err, result) {
                        if (!result) {
                            callback(null, true);
                        }
                        callback(null, false);
                    });
                }], function(err, results) {
                        var category;
                        if (!results) {
                            return res.status(400).json('already exist');
                        }
                        category = new Category(req.body);
                        category.save(function(err, category) {
                            if (err) {
                                return res.status(400).json('wrong');
                            }
                        });
                        return res.status(200).json(category);
                });
            }
        } else {
            return res.status(400).json('subCategory name cannot be null');
        }
    }
};

/**
 * [update update a new category]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.update = function(req, res) {
    var category;
    if (req.body._id) {
        category = req.body;
        Category.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            subCategory: req.body.subCategory
        }, function(err, category) {
            if (err) {
                return res.status(400).json('wrong');
            }
        });
        res.status(200).json({
            'message': 'category updated'
        });
    } else {
        return res.status(400).json('Id cannot be null');
    }
};

/**
 * [delete a new category]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.delete = function(req, res) {
    if (req.body._id) {
        Category.findOne({
            _id: req.body.id
        }, function(err, category) {
            category.remove(function() {
                res.json({
                    'message': 'category deleted'
                });
            });
        });
    } else {
        return res.status(400).json('Id cannot be null');
    }
};
