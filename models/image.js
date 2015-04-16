var Image, Schema, mongoose, relationship;

relationship = require("mongoose-relationship")
mongoose     = require('mongoose');
Schema       = mongoose.Schema;

var ImageSchema = new Schema({
    url: { type: String, required: true },
    organization: { type: Schema.Types.ObjectId, ref:"Organization", childPath: "images" }
});
ImageSchema.plugin(relationship, { relationshipPathName:'organization' });

Image          = mongoose.model('Image', ImageSchema);
module.exports = Image;