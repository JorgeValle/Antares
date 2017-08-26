var express = require('express');
var router = express.Router();
var ctrlAuth = require('../controllers/authentication.controller');

const passport = require('passport');

require('../config/passport.config');

// login
router.post('/login', ctrlAuth.login);

// signup
router.post('/signup', ctrlAuth.signup);

module.exports = router;
