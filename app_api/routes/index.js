var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/index');
var bodyParser = require('body-parser');

// get all pages
router.get('/pages', bodyParser.json(), ctrlIndex.readAllPages);

// get page by page url
router.get('/pages/:url', bodyParser.json(), ctrlIndex.readOnePage);

// create page by page url
router.post('/pages/create', ctrlIndex.createOnePage);

module.exports = router;