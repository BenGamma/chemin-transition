var Category, async;

Category = require('../models/category');

async = require('async');

exports.view = function(req, res, next) {
  return Category.find(function(err, categories) {
    if (err) {
      res.status(400).json('wrong');
    }
    return res.status(200).json(categories);
  });
};

exports.create = function(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      if (req.body.name === 'test') {
        return res.status(400).json('category name cannot be equal to test');
      } else {
        return async.waterfall([
          function(callback) {
            return Category.findOne({
              name: req.body.name
            }, function(err, result) {
              if (!result) {
                return callback(null, true);
              }
              return callback(null, false);
            });
          }
        ], function(err, results) {
          var category;
          if (!results) {
            res.status(400).json('already exist');
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

exports.update = function(req, res) {
  var category;
  if (req.body._id) {
    category = req.body;
    console.log(category);
    Category.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      subCategory: req.body.subCategory
    }, function(err, category) {
      if (err) {
        return res.status(400).json('wrong');
      }
    });
    return res.status(200).json({
      'message': 'category updated'
    });
  } else {
    return res.status(400).json('Id cannot be null');
  }
};

exports["delete"] = function(req, res) {
  if (req.body._id) {
    return Category.findOne({
      _id: req.body.id
    }, function(err, category) {
      return category.remove(function() {
        return res.json({
          'message': 'category deleted'
        });
      });
    });
  } else {
    return res.status(400).json('Id cannot be null');
  }
};
