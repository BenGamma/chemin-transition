var ObjectId, Person, PersonSchema, Schema, User, async, mongoose, userBaseSchema;

userBaseSchema = require('./userBase');
User           = require('./user');
mongoose       = require('mongoose');
Schema         = mongoose.Schema;
ObjectId       = Schema.ObjectId;
async          = require('async');

PersonSchema = new userBaseSchema({
    firstName: String,
    lastName: String,
    badge: String,
    personOrganizations: [{ type: Schema.ObjectId, ref: "OrganizationPerson" }]
});

/**
 * [serialize Person]
 * @return {Object}
 */
PersonSchema.methods.serialize = function() {
    return {
        "id": this._id,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "email": this.local.email,
        "badge": this.badge,
        "token": this.local.token
    };
};

/**
 * [ArraySerialize serialize person]
 * @param {Array} persons
 */
PersonSchema.statics.ArraySerialize = function(persons) {
    var result;
    result = [];
    async.each(persons, function(person) {
        result.push({
            "id": person._id,
            "image": person.image,
            "firstName": person.firstName,
            "lastName": person.lastName,
            "email": person.local.email,
            "fullName": person.firstName + ' ' + person.lastName
        });
    });
    return result;
};

Person         = User.discriminator('Person', PersonSchema);
module.exports = Person;
