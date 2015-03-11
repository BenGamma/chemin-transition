mongoose  = require 'mongoose'
Schema    = mongoose.Schema


skillSchema = new Schema
    name : type: String, required: true
    organizationSkills:[{ type:Schema.ObjectId, ref:"organizationSkill" }]

Skill = mongoose.model('Skill', skillSchema)

module.exports = Skill