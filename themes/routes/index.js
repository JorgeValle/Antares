var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main');
var ctrlPages = require('../controllers/pages');
var ctrlQueries = require('../controllers/queries');

/* GET theme home page */
router.get('/', ctrlMain.homepage);

/* GET page by url */
router.get('/blog/:pageUrl', ctrlPages.pageByUrl);

/* GET queries */
router.get('/blog', ctrlQueries.queryAll);

/* GET sitemap */
router.get('/sitemap', ctrlQueries.sitemap);

module.exports = router;