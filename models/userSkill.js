var ObjectId, Schema, UserSkill, mongoose, relationship, userSkillSchema;

mongoose = require('mongoose');
Schema   = mongoose.Schema;
ObjectId = Schema.ObjectId;

relationship = require('mongoose-relationship');

userSkillSchema = new Schema({
    skill: { type: ObjectId, ref: 'Skill', required: true, childPath: 'userSkills' },
    organization: { type: ObjectId, ref: 'Organization', required: true, childPath: 'userSkills' }
});

userSkillSchema.plugin(relationship, {
    relationshipPathName: 'skill'
});

userSkillSchema.plugin(relationship, {
    relationshipPathName: 'organization'
});

UserSkill      = mongoose.model('UserSkill', userSkillSchema);
module.exports = UserSkill;
