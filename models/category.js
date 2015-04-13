var Category, Schema, categorySchema, mongoose;

mongoose = require('mongoose');

Schema = mongoose.Schema;

categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: 'subCategory'
  }
});

Category = mongoose.model('Category', categorySchema);

module.exports = Category;
