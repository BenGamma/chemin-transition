userBaseSchema = require './userBase'
User           = require './user'

PersonSchema = new userBaseSchema()

Person = User.discriminator 'Person', PersonSchema

module.exports = Person
