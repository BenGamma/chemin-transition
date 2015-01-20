userBaseSchema = require './userBase'
User = require './user'
console.log(User)
PersonSchema = new userBaseSchema()

module.exports = User.discriminator.model 'Person', PersonSchema
