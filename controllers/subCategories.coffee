SubCategory = require '../models/subCategory'

exports.create = (req, res, next) ->
    console.log req
    subCategory = new SubCategory(req.body)

    SubCategory.save (err, subCategory) ->
        if err
            res.status(400).json('wrong')

        res.status(200).json(subCategory)

exports.view = (req, res, next) ->
	SubCategory.find (err, subCategories) ->
		if err
			res.status(400).json('wrong')

		res.status(200).json(subCategories)

exports.update = (req, res) ->
    subCategory = req.body

    SubCategory.findByIdAndUpdate req.body.id, { name: req.body.name, category: req.body.category }, (err, subCategory) ->
        if err
    	    res.status(400).json('wrong')

    res.status(200).json 'message' : 'subcategory updated'


exports.delete = (req, res) ->
    SubCategory.findOne _id: req.body.id , (err, subCategory) ->
        subCategory.remove ->
            res.json 'message' : 'subCategory deleted'
