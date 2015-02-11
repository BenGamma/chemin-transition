userBaseSchema = require './userBase'
User           = require './user'

OrganizationSchema = new userBaseSchema({ name: String, address: String, city: String, zipCode: String, phone: String })

OrganizationSchema.methods.serialize = ->
	"name" : @local.name
    "address": @local.address
    "city" : @local.city
    "zipCode" : @local.zipCode
    "phone" : @local.phone

Organization = User.discriminator 'Organization', OrganizationSchema

module.exports = Organization 
