SubCategory = require '../models/subCategory'

exports.create = (req, res, next) ->
    console.log req
    subCategory = new SubCategory(req.body)

    subCategory.save (err, subCategory) ->
        if err
            res.status(400).json('wrong')

        res.status(200).json(subCategory)