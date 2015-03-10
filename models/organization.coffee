userBaseSchema = require './userBase'
User           = require './user'
mongoose       = require('mongoose')
async          = require 'async'
Schema         = mongoose.Schema
ObjectId       = Schema.ObjectId

OrganizationSchema = new userBaseSchema
    name: String, 
    address: String, 
    city: String, 
    zipCode: String, 
    phone: String,
    coordinates:
        lt: String,
        lg: String,
    organizationPersons:[{ type:Schema.ObjectId, ref:"organizationPerson" }]

OrganizationSchema.methods.serialize = ->
	result = 
        "name"        : @name
        "email"       : @local.email
        "address"     : @address
        "city"        : @city
        "zipCode"     : @zipCode
        "phone"       : @phone
        "coordinates" : [@coordinates.lt, @coordinates.lg]

OrganizationSchema.statics.ArraySerialize = (organizations) ->
    result = [];
    async.each organizations, (organization) ->
        result.push
            "id"          : organization._id
            "email"       : organization.local.email
            "address"     : organization.address
            "city"        : organization.city
            "zipcode"     : organization.zipCode
            "phone"       : organization.phone
            "coordinates" : [organization.coordinates.lt, organization.coordinates.lg]

    result

Organization = User.discriminator 'Organization', OrganizationSchema

module.exports = Organization 
