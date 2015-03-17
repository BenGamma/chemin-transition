mongoose     = require('mongoose')
Schema       = mongoose.Schema
ObjectId     = Schema.ObjectId
relationship = require 'mongoose-relationship'
async        = require 'async'


organizationPersonSchema = new Schema
    person         : { type: ObjectId, ref: 'Person', required: true, childPath: 'organizationPersons' },
    organization   : { type: ObjectId, ref: 'Organization', required: true, childPath: 'organizationPersons'  },
    actor          : { type: Boolean, default: false}

organizationPersonSchema.plugin(relationship, { relationshipPathName:'organization' });
organizationPersonSchema.plugin(relationship, { relationshipPathName:'person' });

organizationPersonSchema.statics.ArraySerialize = (actors) ->
    result = [];
    async.each actors, (actor) ->
        result.push
            "id"        : actor._id
            "actor_id"  : actor.person._id
            "image"     : actor.person.image
            "firstName" : actor.person.firstName
            "lastName"  : actor.person.lastName
            "email"     : actor.person.local.email
            "fullName"  : actor.person.firstName+' '+actor.person.lastName 
    result

OrganizationPerson  = mongoose.model('OrganizationPerson', organizationPersonSchema)

module.exports = OrganizationPerson