userBaseSchema = require './userBase'
User           = require './user'
mongoose       = require('mongoose')
Schema         = mongoose.Schema
ObjectId       = Schema.ObjectId

OrganizationSchema = new userBaseSchema
    name: String, 
    address: String, 
    city: String, 
    zipCode: String, 
    phone: String,
    organizationPersons:[{ type:Schema.ObjectId, ref:"organizationPerson" }]

OrganizationSchema.methods.serialize = ->
	"name" : @local.name
    "address": @local.address
    "city" : @local.city
    "zipCode" : @local.zipCode
    "phone" : @local.phone

Organization = User.discriminator 'Organization', OrganizationSchema

module.exports = Organization 
