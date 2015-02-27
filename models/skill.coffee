mongoose  = require 'mongoose'
Schema    = mongoose.Schema


skillSchema = new Schema
    name : type: String, required: true

Skill = mongoose.model('Skill', skillSchema)

module.exports = Skill