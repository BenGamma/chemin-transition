SubCategory = require '../models/subCategory'

exports.create = (req, res, next) ->
    console.log req
    if (req.body)
	    if (req.body.name)
	    	if (req.body.name == 'test')
	    		res.status(400).json('subcategory name cannot be equal to test')
	    	else
	        	subCategory = new SubCategory(req.body)

	    		subCategory.save (err, subCategory) ->
	        		if err
	            		res.status(400).json('wrong')
	        		res.status(200).json(subCategory)
	    else
	        res.status(400).json('subCategory name cannot be null')
    			
exports.view = (req, res, next) ->
		SubCategory.find (err, subCategories) ->
			if err
				res.status(400).json('wrong')

			res.status(200).json(subCategories)

exports.update = (req, res) ->
	if (req.body._id)
    	subCategory = req.body

    	SubCategory.findByIdAndUpdate req.body.id, { name: req.body.name, category: req.body.category }, (err, subCategory) ->
        	if err
    	    	res.status(400).json('wrong')

    	res.status(200).json 'message' : 'subcategory updated'
    else
    	res.status(400).json('Id cannot be null')

exports.delete = (req, res) ->
	if (req.body._id)
    	SubCategory.findOne _id: req.body.id , (err, subCategory) ->
        	subCategory.remove ->
            	res.json 'message' : 'subCategory deleted'
    else
    	res.status(400).json('Id cannot be null')
