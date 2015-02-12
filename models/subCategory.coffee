mongoose  = require 'mongoose'
Schema    = mongoose.Schema


subCategoriesSchema = new Schema
    name : type: String, required: true
    category : type: Schema.Types.ObjectId, ref: 'category'
    
SubCategory = mongoose.model('SubCategory', subCategoriesSchema)

module.exports = SubCategory