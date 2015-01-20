userBaseSchema = require './userBase'
mongoose       = require 'mongoose'

UserSchema = new userBaseSchema();

User   = mongoose.model 'User', UserSchema

module.exports = User