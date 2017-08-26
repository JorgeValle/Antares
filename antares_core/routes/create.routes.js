// a constant is a variable that should be read-only after initial value is set
const express = require('express');
const router = express.Router();
// bring in controller
const createCtrl = require('../controllers/create.controller.js');

// create specific, by content type
router.post('/create/:contentType', createCtrl.createOneByContent);

module.exports = router;
