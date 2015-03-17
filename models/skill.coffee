mongoose  = require 'mongoose'
Schema    = mongoose.Schema


skillSchema = new Schema
    name  : type: String, required: true
    image : type: String
    users:[{ type:Schema.ObjectId, ref:"User" }]

Skill = mongoose.model('Skill', skillSchema)

module.exports = Skill