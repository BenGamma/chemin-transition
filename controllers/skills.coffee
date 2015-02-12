Skill    = require '../models/skill'

exports.create = (req, res, next) ->
    skill = new Skill(req.body)

    skill.save (err, skill) ->
        if err
            res.status(400).json('wrong')

        res.status(200).json(skill)