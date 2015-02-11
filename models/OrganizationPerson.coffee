mongoose = require('mongoose')
Schema   = mongoose.Schema
ObjectId = Schema.ObjectId


organizationPersonSchema = new Schema
    person         : { type: ObjectId, ref: 'Person', required: true }
    organization   : { type: ObjectId, ref: 'Organization', required: true }
    actor          : { type: Boolean, default: false}

OrganizationPerson  = mongoose.model('OrganizationPerson', organizationPersonSchema)

module.exports = OrganizationPerson