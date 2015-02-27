Skill    = require '../models/skill'

exports.create = (req, res, next) ->
    skill = new Skill(req.body)

    skill.save (err, skill) ->
        if err
            res.status(400).json('wrong')

        res.status(200).json(skill)


exports.view = (req, res, next) ->
	Skill.find (err, skills) ->
		if err
			res.status(400).json('wrong')

		res.status(200).json(skills)

    
exports.update = (req, res) ->
    skill = req.body

    Skill.findByIdAndUpdate req.body.id, { name: req.body.name }, (err, skill) ->
        if err
    	    res.status(400).json('wrong')

    res.status(200).json 'message' : 'skill updated'


exports.delete = (req, res) ->
    Skill.findOne _id: req.body.id , (err, skill) ->
        skill.remove ->
            res.json 'message' : 'skill deleted'
