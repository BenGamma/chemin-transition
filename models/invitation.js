var Invitation, Schema, mongoose, relationship;

relationship = require("mongoose-relationship")
mongoose     = require('mongoose');
Schema       = mongoose.Schema;

var InvitationSchema = new Schema({
    email: { type: String, required: true },
    enable: { type: Boolean, "default": true},
    user: { type: Schema.Types.ObjectId, ref:"User", childPath: "invitations" },
    type: {type: String}
});
InvitationSchema.plugin(relationship, { relationshipPathName:'user' });

Invitation     = mongoose.model('Invitation', InvitationSchema);
module.exports = Invitation;