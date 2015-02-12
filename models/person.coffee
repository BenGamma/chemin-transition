userBaseSchema = require './userBase'
User           = require './user'
mongoose     = require('mongoose')
Schema       = mongoose.Schema
ObjectId     = Schema.ObjectId

PersonSchema = new userBaseSchema
    firstName: String, 
    lastName: String, 
    bladge: String ,
    personOrganizations:[{ type:Schema.ObjectId, ref:"OrganizationPerson" }]

PersonSchema.methods.serialize = ->
	"firstName" : @local.firstName
    "lastName": @local.lastName
    "badge" : @local.badge

Person = User.discriminator 'Person', PersonSchema

module.exports = Person