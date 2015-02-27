Category    = require '../models/category'

exports.view = (req, res, next) ->
	Category.find (err, categories) ->
		if err
			res.status(400).json('wrong')

		res.status(200).json(categories)


exports.create = (req, res, next) ->
    category = new Category(req.body)
    category.save (err, category) ->
        if err
            res.status(400).json('wrong')

        res.status(200).json(category)
    
exports.update = (req, res) ->
    category = req.body
    console.log(category)

    Category.findByIdAndUpdate req.body.id, { name: req.body.name, subCategory: req.body.subCategory }, (err, category) ->
        if err
    	    res.status(400).json('wrong')

    res.status(200).json 'message' : 'category updated'


exports.delete = (req, res) ->
    Category.findOne _id: req.body.id , (err, category) ->
        category.remove ->
            res.json 'message' : 'category deleted'
