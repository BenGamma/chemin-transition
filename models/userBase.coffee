mongoose  = require 'mongoose'
Schema    = mongoose.Schema
util      = require 'util'
bcrypt    = require 'bcrypt-nodejs'
randtoken = require 'rand-token'


userBaseSchema = ->
    Schema.apply(@, arguments);

    @add
        local:
            firstName    : String,
            lastName     : String,
            email        : String,
            password     : String,
            token        : String,
    #methods ======================
    #generating a hash
    @methods.generateHash = (password) ->
        bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

    #checking if password is valid
    @methods.validPassword = (password) ->
        bcrypt.compareSync(password, @local.password);

    #generate token
    @methods.generateToken = ->
        @local.token = randtoken.generate(16);

    @pre 'save', (next) ->
        @generateToken() if @isNew
        next();

module.exports = userBaseSchema