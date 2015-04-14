var ObjectId, Organization, OrganizationPerson, OrganizationSchema, Schema, User, async, mongoose, userBaseSchema;

userBaseSchema = require('./userBase');

User = require('./user');

mongoose = require('mongoose');

async = require('async');

Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

OrganizationPerson = require('../models/organizationPerson');

OrganizationSchema = new userBaseSchema({
  name: String,
  address: String,
  city: String,
  zipCode: String,
  phone: String,
  coordinates: {
    lt: String,
    lg: String
  },
  organizationPersons: [
    {
      type: Schema.ObjectId,
      ref: "OrganizationPerson"
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
  return result;
};

OrganizationSchema.statics.ArraySerialize = function(organizations) {
  var result;
  result = [];
  async.each(organizations, function(organization) {
    return result.push({
      "type": 'Feature',
      "id": organization._id,
      "image": organization.image,
      'properties': {
        "email": organization.local.email,
        "phone": organization.phone,
        "name": organization.name,
        "skills": organization.skills
      },
      'geometry': {
        'type': 'Point',
        "coordinates": [organization.coordinates.lt, organization.coordinates.lg]
      },
      "skills": organization.skills
    });
  });
  return result;
};

Organization = User.discriminator('Organization', OrganizationSchema);

module.exports = Organization;
