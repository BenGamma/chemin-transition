userBaseSchema = require './userBase'
User           = require './user'
mongoose     = require('mongoose')
Schema       = mongoose.Schema
ObjectId     = Schema.ObjectId

PersonSchema = new userBaseSchema
    firstName: String, 
    lastName: String, 
    badge: String ,
    personOrganizations:[{ type:Schema.ObjectId, ref:"OrganizationPerson" }]

PersonSchema.methods.serialize = ->
    result = 
        "firstName" : @firstName
        "lastName"  : @lastName
        "email"     : @local.email
        "badge"     : @badge

Person = User.discriminator 'Person', PersonSchema

module.exports = Person