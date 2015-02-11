mongoose  = require 'mongoose'
Schema    = mongoose.Schema
util      = require 'util'


userBaseSchema = ->
    Schema.apply(@, arguments);

    @add
        local:
            email        : type: String, required: true
            password     : type: String, required: true
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

    @methods.serialize = ->
        "id": @_id,
        "email": @local.email,
        "token": @local.token

    @pre 'save', (next) ->
        @generateToken() if @isNew
        next();

util.inherits userBaseSchema, Schema

module.exports = userBaseSchema 