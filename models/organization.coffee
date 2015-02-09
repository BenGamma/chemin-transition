userBaseSchema = require './userBase'
User           = require './user'

OrganizationSchema = new userBaseSchema({ name: String, address: String, city: String, zipCode: String, phone: String })

Organization = User.discriminator 'Organization', OrganizationSchema

module.exports = Organization 
