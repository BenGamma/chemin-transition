mongoose     = require('mongoose')
Schema       = mongoose.Schema
ObjectId     = Schema.ObjectId
relationship = require 'mongoose-relationship'


organizationPersonSchema = new Schema
    person         : { type: ObjectId, ref: 'Person', required: true, childPath: 'organizationPersons' },
    organization   : { type: ObjectId, ref: 'Organization', required: true, childPath: 'organizationPersons'  },
    actor          : { type: Boolean, default: false}

organizationPersonSchema.plugin(relationship, { relationshipPathName:'organization' });
organizationPersonSchema.plugin(relationship, { relationshipPathName:'person' });

OrganizationPerson  = mongoose.model('OrganizationPerson', organizationPersonSchema)

module.exports = OrganizationPerson