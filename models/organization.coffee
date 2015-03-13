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
    organizationPersons:[{ type:Schema.ObjectId, ref:"OrganizationPerson" }]

OrganizationSchema.methods.serialize = ->
	result = 
        "type"        : @__t
        "image"       : @image
        "name"        : @name
        "email"       : @local.email
        "address"     : @address
        "city"        : @city
        "zipCode"     : @zipCode
        "phone"       : @phone
        "coordinates" : [@coordinates.lt, @coordinates.lg]
        "skills"      : @skills
        "token"       : @local.token

OrganizationSchema.statics.ArraySerialize = (organizations) ->
    result = [];
    async.each organizations, (organization) ->
        result.push
            "type"            : 'Feature'
            "id"              : organization._id
            'properties'      :
                "email"       : organization.local.email
                "phone"       : organization.phone
                "name"        : organization.name
            'geometry'        :
                'type'        : 'Point'
                "coordinates" : [organization.coordinates.lt, organization.coordinates.lg]

    result

Organization = User.discriminator 'Organization', OrganizationSchema

module.exports = Organization 
