Categorie    = require '../models/categorie'

exports.create = (req, res, next) ->
    console.log req
    categorie = new categorie()
    categorie = req.body

    Categorie.save (err, categorie) ->
        if err
            res.status(400).json('wrong')
 #          else
        res.status(200).json(categorie.serialize())
    
    # # (req, res, next)