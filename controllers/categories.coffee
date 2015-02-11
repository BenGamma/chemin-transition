Categorie    = require '../models/categorie'

exports.create = (req, res, next) ->
    console.log req
    categorie = new Categorie(req.body)

    categorie.save (err, categorie) ->
        if err
            res.status(400).json('wrong')

        res.status(200).json(categorie)
    