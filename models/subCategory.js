var Schema, SubCategory, mongoose, subCategorySchema;

mongoose = require('mongoose');

Schema = mongoose.Schema;

subCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  }
});

SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
