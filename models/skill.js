var Schema, Skill, mongoose, skillSchema, async;
async    = require('async');
mongoose = require('mongoose');
Schema   = mongoose.Schema;

skillSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    users: [{ type: Schema.ObjectId, ref: "User" }  ]
});

/**
 * [add skills]
 * @param {Array} newSkills
 */
skillSchema.statics.add = function(newSkills) {
    var Skill = this;
    var skills = [];
    async.each(newSkills, function(skill) {
        var object;
        object = new Skill({
            name: skill.name
        });
        object.save();
        return skills.push(object._id);
    });
    return skills;
}

Skill          = mongoose.model('Skill', skillSchema);
module.exports = Skill;
