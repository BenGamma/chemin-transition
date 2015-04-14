"use strict";
module.exports = function(sequelize, DataTypes) {
  var coordinate = sequelize.define("coordinate", {
    lt: DataTypes.STRING,
    lg: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        coordinate.belongTo(organization)
      }
    }
  });
  return coordinate;
};