const express = require('express');
const router = express.Router();

let ctrlMain = require('../controllers/main');
let ctrlPages = require('../controllers/pages');
let ctrlQueries = require('../controllers/queries');

/* GET theme home page */
router.get('/', ctrlMain.homepage);

/* GET page by url */
router.get('/blog/:pageUrl', ctrlPages.pageByUrl);

/* GET queries */
router.get('/blog', ctrlQueries.queryAll);

/* GET sitemap */
router.get('/sitemap', ctrlQueries.sitemap);

module.exports = router;