mongoose = require('mongoose')
Schema   = mongoose.Schema
ObjectId = Schema.ObjectId


organizationPersonSchema = new Schema
    person_id         : { type: ObjectId, ref: 'Person' }
    organization_id   : { type: ObjectId, ref: 'Organization' }
    actor             : Boolean

OrganizationPerson  = mongoose.model('OrganizationPerson', organizationPersonSchema)

module.exports = OrganizationPerson