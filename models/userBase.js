var Schema, bcrypt, mongoose, randtoken, userBaseSchema, util;

bcrypt = require('bcrypt-nodejs');

randtoken = require('rand-token');

mongoose = require('mongoose');

Schema = mongoose.Schema;

util = require('util');

userBaseSchema = function() {
  Schema.apply(this, arguments);
  this.add({
    local: {
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      token: String,
      enable: {
        type: Boolean,
        "default": true
      }
    },
    image: {
      type: String
    },
    skills: [
      {
        type: Schema.ObjectId,
        ref: "Skill",
        unique: true,
        childPath: "users"
      }
    ]
  });
  this.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  this.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
  };
  this.methods.generateToken = function() {
    this.local.enable = true;
    return this.local.token = randtoken.generate(16);
  };
  return this.pre('save', function(next) {
    if (this.isNew) {
      this.generateToken();
    }
    return next();
  });
};

util.inherits(userBaseSchema, Schema);

module.exports = userBaseSchema;
