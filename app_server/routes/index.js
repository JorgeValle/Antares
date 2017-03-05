var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlPages = require('../controllers/pages');

/* GET home page */
router.get('/', ctrlMain.index);

/* GET page by title */
router.get('/:pageUrl', ctrlPages.pageByTitle);

module.exports = router;