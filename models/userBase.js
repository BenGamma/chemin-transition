var Schema, bcrypt, mongoose, randtoken, userBaseSchema, util, Invitation;

bcrypt = require('bcrypt-nodejs');
randtoken = require('rand-token');
mongoose = require('mongoose');
Invitation = require('./invitation');
Schema = mongoose.Schema;
util = require('util');

userBaseSchema = function() {
    Schema.apply(this, arguments);
        this.add({
            local: {
                email: { type: String, required: true },
                password: { type: String, required: true },
                token: String,
                enable: { type: Boolean, "default": true }
            },
            image: { type: String },
            description: String,
            url: String,
            created_at    : { type: Date },
            updated_at    : { type: Date },
            skills: [{ type: Schema.ObjectId, ref: "Skill", unique: true, childPath: "users" }],
            invitations: [{ type: Schema.ObjectId, ref: "Invitation", childPath: "user" }],
            images: [{ type: Schema.ObjectId, ref: "Image", childPath: 'organization' }]
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
    this.pre('save', function(next) {
        now = new Date();
        if (this.isNew) {
            this.generateToken();
        }
        this.updated_at = now;
        if ( !this.created_at ) {
            this.created_at = now;
        }
        return next();
    });

    this.pre('save', function(next){
        Invitation
            .findOne()
            .where({'email': this.local.email})
            .exec(function(err, invitation){
                if(invitation) {
                    invitation.enable = false;
                    invitation.save();
                }
            })
        next();
    })
};

util.inherits(userBaseSchema, Schema);
module.exports = userBaseSchema;
