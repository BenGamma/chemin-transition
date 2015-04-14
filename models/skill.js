"use strict";
module.exports = function(sequelize, DataTypes) {
  var skill = sequelize.define("skill", {
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        skill.hasMany(User)
      }
    }
  });
  return skill;
};