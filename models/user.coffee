userBaseSchema = require './userBase'
mongoose       = require 'mongoose'

UserSchema = new userBaseSchema();

module.exports = mongoose.model('User', UserSchema)