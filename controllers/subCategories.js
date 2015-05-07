var SubCategory;

SubCategory = require('../models/subCategory');

/**
 * [create subCategory]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.create = function(req, res, next) {
  var subCategory;
  console.log(req);
  if (req.body.name) {
    if (req.body.name === 'test') {
      return res.status(400).json('subcategory name cannot be equal to test');
    } else {
      if (req.body.category) {
        subCategory = new SubCategory(req.body);
        return subCategory.save(function(err, subCategory) {
          if (err) {
            res.status(400).json('wrong');
          }
          return res.status(200).json(subCategory);
        });
      } else {
        return res.status(400).json('category is require for create subcategory');
      }
    }
  } else {
    return res.status(400).json('subCategory name cannot be null');
  }
};

/**
 * [view show subCategory]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.view = function(req, res, next) {
  if (req.body._id) {
    return SubCategory.find(function(err, subCategories) {
      if (err) {
        res.status(400).json('wrong');
      }
      return res.status(200).json(subCategories);
    });
  } else {
    return res.status(400).json('Id cannot be null');
  }
};

/**
 * [update subCategory]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.update = function(req, res) {
  var subCategory;
  subCategory = req.body;
  SubCategory.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    category: req.body.category
  }, function(err, subCategory) {
    if (err) {
      return res.status(400).json('wrong');
    }
  });
  return res.status(200).json({
    'message': 'subcategory updated'
  });
};

exports["delete"] = function(req, res) {
  return SubCategory.findOne({
    _id: req.body.id
  }, function(err, subCategory) {
    return subCategory.remove(function() {
      return res.json({
        'message': 'subCategory deleted'
      });
    });
  });
};
