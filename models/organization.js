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
  ]
});

OrganizationSchema.methods.serialize = function() {
  var result;
  return result = {
    "id": this._id,
    "type": this.__t,
    "image": this.image,
    "name": this.name,
    "email": this.local.email,
    "address": this.address,
    "description": this.description,
    "created_at": this.created_at,
    "updated_at": this.updated_at,
    "city": this.city,
    "zipCode": this.zipCode,
    "phone": this.phone,
    "coordinates": [this.coordinates.lt, this.coordinates.lg],
    "skills": this.skills,
    "token": this.local.token
  };
};

OrganizationSchema.statics.ActorArraySerialize = function(actors) {
  var result;
  result = [];
  async.each(actors, function(actor) {
    return result.push({
      "id": actor.person._id,
      "image": actor.person.image,
      "firstName": actor.person.firstName,
      "lastName": actor.person.lastName,
      "email": actor.person.local.email,
      "fullName": actor.person.firstName + ' ' + actor.person.lastName
    });
  });
  return organization;
};