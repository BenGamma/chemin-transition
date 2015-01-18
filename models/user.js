var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var randtoken = require('rand-token');

var userSchema = mongoose.Schema({

    local            : {
        firstName    : String,
        lastName     : String,
        email        : String,
        password     : String,
        token        : String,
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// generate token
userSchema.methods.generateToken = function() {
    return this.local.token = randtoken.generate(16);
};

userSchema.pre('save', function (next) {
  if (this.isNew) this.generateToken();
  next();
})

module.exports = mongoose.model('User', userSchema);