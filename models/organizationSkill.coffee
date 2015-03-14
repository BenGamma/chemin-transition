mongoose     = require('mongoose')
Schema       = mongoose.Schema
ObjectId     = Schema.ObjectId
relationship = require 'mongoose-relationship'


organizationSkillSchema = new Schema
    skill         : { type: ObjectId, ref: 'Skill', required: true, childPath: 'organizationSkills' },
    organization   : { type: ObjectId, ref: 'Organization', required: true, childPath: 'organizationSkills'  }

organizationSkillSchema.plugin(relationship, { relationshipPathName:'skill' });
organizationSkillSchema.plugin(relationship, { relationshipPathName:'person' });

OrganizationSkill  = mongoose.model('OrganizationSkill', organizationSkillSchema)

module.exports = OrganizationSkill