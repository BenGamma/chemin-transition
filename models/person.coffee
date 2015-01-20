userBaseSchema = require './userBase'
User = require './user'
PersonSchema = new userBaseSchema()

#module.exports = User.discriminator.model 'Person', PersonSchema
