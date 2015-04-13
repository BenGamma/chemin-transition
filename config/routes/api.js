var authorization, categories, express, organizations, router, sessions, skills, subCategories, users;

express = require('express');

router = express.Router();

users = require('./api/users');

sessions = require('./api/sessions');

authorization = require('../authorization');

categories = require('./api/categories');

subCategories = require('./api/subCategories');

skills = require('./api/skills');

organizations = require('./api/organizations');

router.use('/users', users);

router.use('/sessions', sessions);

router.use('/categories', categories);

router.use('/subCategories', subCategories);

router.use('/skills', skills);

router.use('/organizations', organizations);

module.exports = router;
