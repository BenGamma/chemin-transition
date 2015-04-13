var express, router, skills;

skills = require('../../../controllers/skills');

express = require('express');

router = express.Router();

router.route('/').get(skills.view).post(skills.create).put(skills.update)["delete"](skills["delete"]);

module.exports = router;
