Skill    = require '../models/skill'

exports.create = (req, res, next) ->
    if req.body
        if req.body.name == 'test'
            res.status(400).json('skill name cannot be equal to test')
        else
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
    if req.body
        if req.body.id

            skill = req.body

            Skill.findByIdAndUpdate req.body.id, { name: req.body.name }, (err, skill) ->
                if err
            	    res.status(400).json('wrong')

            res.status(200).json 'message' : 'skill updated'
        else
            res.status(400).json('Id cannot be null')

exports.delete = (req, res) ->
    if req.body.id
        Skill.findOne _id: req.body.id , (err, skill) ->
            Skill.remove ->
                res.json 'message' : 'skill deleted'
    else
        res.status(400).json('Id cannot be null')
