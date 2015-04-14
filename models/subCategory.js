"use strict";
module.exports = function(sequelize, DataTypes) {
  var subCategory = sequelize.define("subCategory", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        subCategory.hasMany(category, {as: 'category_id'})
      }
    }
  });
  return subCategory;
};