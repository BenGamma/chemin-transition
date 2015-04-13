"use strict";
module.exports = function(sequelize, DataTypes) {
  var organization = sequelize.define("organization", {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        coordinate.hasMany(organization, {as: 'coordinate_id'})
      }
    }
  });
  return organization;
};