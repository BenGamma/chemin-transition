userBaseSchema = require './userBase'
User           = require './user'

PersonSchema = new userBaseSchema({ firstName: String, lastName: String, blazon: String })

Person = User.discriminator 'Person', PersonSchema

module.exports = Person