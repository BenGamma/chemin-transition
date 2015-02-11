mongoose  = require 'mongoose'
Schema    = mongoose.Schema


categorieSchema = new Schema
    name : type: String, required: true

Categorie = mongoose.model('Categorie', categorieSchema)

module.exports = Categorie 