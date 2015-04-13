var User, UserSchema, mongoose, relationship, userBaseSchema;

userBaseSchema = require('./userBase');

mongoose = require('mongoose');

relationship = require('mongoose-relationship');

UserSchema = new userBaseSchema();

UserSchema.plugin(relationship, {
  relationshipPathName: 'skills'
});

User = mongoose.model('User', UserSchema);

module.exports = User;
