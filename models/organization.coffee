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
    latlng:
        lt: String,
        lg: String,
    organizationPersons:[{ type:Schema.ObjectId, ref:"organizationPerson" }]

OrganizationSchema.methods.serializeOrg = ->
	"name"    : @name
    "email"   : @email
    "address" : @address
    "city"    : @city
    "zipCode" : @zipCode
    "phone"   : @phone
    "latlng"  :
        'lt'  : @lt
        'lg'  : @lg

OrganizationSchema.statics.ArraySerialize = (organizations) ->
    result = [];
    async.each organizations, (organization) ->
        result.push
            "id"      : organization._id
            "email"   : organization.local.email
            "address" : organization.address
            "city"    : organization.city
            "zipcode" : organization.zipcode
            "phone"   : organization.phone
            "lalng"   : organization.latlng

    result

Organization = User.discriminator 'Organization', OrganizationSchema

module.exports = Organization 
