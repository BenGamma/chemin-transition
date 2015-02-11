userBaseSchema = require './userBase'
User           = require './user'

PersonSchema = new userBaseSchema({ firstName: String, lastName: String, bladge: String })

PersonSchema.methods.serialize = ->
	"firstName" : @local.firstName
    "lastName": @local.lastName
    "badge" : @local.badge

Person = User.discriminator 'Person', PersonSchema

module.exports = Person