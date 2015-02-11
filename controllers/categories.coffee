Categorie    = require '../models/categorie'

exports.create = (req, res, next) ->
    console.log req
    categorie = new categorie()
    categorie = req.body
    
    # # (req, res, next)