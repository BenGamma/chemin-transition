var ObjectId, Organization, OrganizationPerson, OrganizationSchema, Schema, User, async, mongoose, userBaseSchema;

userBaseSchema     = require('./userBase');
User               = require('./user');
mongoose           = require('mongoose');
async              = require('async');
Schema             = mongoose.Schema;
ObjectId           = Schema.ObjectId;
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
    organizationPersons: [{ type: Schema.ObjectId, ref: "OrganizationPerson" }],
    images: [{ type: Schema.ObjectId, ref: "Image", childPath: 'organization' }]
});

/**
 * [serialize Organization]
 * @return {Object} return an organization object
 */
OrganizationSchema.methods.serialize = function() {
    return {
        "id": this._id,
        "type": this.__t,
        "image": this.image,
        "name": this.name,
        "email": this.local.email,
        "address": this.address,
        "description": this.description,
        "url": this.url,
        "created_at": this.created_at,
        "updated_at": this.updated_at,
        "city": this.city,
        "zipCode": this.zipCode,
        "phone": this.phone,
        "coordinates": [this.coordinates.lt, this.coordinates.lg],
        "skills": this.skills,
        "images": this.images,
        "token": this.local.token
    };
};

/**
 * [ActorArraySerialize serialize actors relationships]
 * @param {Array} actors
 */
OrganizationSchema.statics.ActorArraySerialize = function(actors) {
    var result;
    result = [];
    async.each(actors, function(actor) {
        result.push({
            "id": actor.person._id,
            "image": actor.person.image,
            "firstName": actor.person.firstName,
            "lastName": actor.person.lastName,
            "email": actor.person.local.email,
            "fullName": actor.person.firstName + ' ' + actor.person.lastName
        });
    });
    return result;
}   

/**
 * [ArraySerialize serialize collection of organization]
 * @param {Array} organizations
 */
OrganizationSchema.statics.ArraySerialize = function(organizations) {
    var result;
    result = [];
    async.each(organizations, function(organization) {
        result.push({
            "type": 'Feature',
            "id": organization._id,
            "image": organization.image,
            "description": organization.description,
            "url": organization.url,
            'properties': {
                "email": organization.local.email,
                "phone": organization.phone,
                "name": organization.name,
                "skills": organization.skills,
                "images": organization.images,
            },
            'geometry': {
                'type': 'Point',
                "coordinates": [organization.coordinates.lt, organization.coordinates.lg]
            }
      });
    });
    return result;
};

Organization   = User.discriminator('Organization', OrganizationSchema);
module.exports = Organization;
