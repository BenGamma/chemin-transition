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
    lt: String,
    lg: String,
    organizationPersons:[{ type:Schema.ObjectId, ref:"organizationPerson" }]

OrganizationSchema.methods.serializeOrg = ->
	"name" : @name
    "address": @address
    "city" : @city
    "zipCode" : @zipCode
    "phone" : @phone

Organization = User.discriminator 'Organization', OrganizationSchema

module.exports = Organization 
