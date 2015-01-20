userBaseSchema = require './userBase'
User           = require './user'

OrganizationSchema = new userBaseSchema()

Organization = User.discriminator 'Organization', OrganizationSchema

module.exports = Organization 
