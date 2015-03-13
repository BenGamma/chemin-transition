userBaseSchema = require './userBase'
User           = require './user'
mongoose       = require('mongoose')
Schema         = mongoose.Schema
ObjectId       = Schema.ObjectId
async          = require 'async'

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
        "token"     : @local.token

PersonSchema.statics.ArraySerialize = (persons) ->
    result = [];
    async.each persons, (person) ->
        result.push
            "id"        : person._id
            "image"     : person.image
            "firstName" : person.firstName
            "lastName"  : person.lastName
            "email"     : person.local.email
    result

Person = User.discriminator 'Person', PersonSchema

module.exports = Person