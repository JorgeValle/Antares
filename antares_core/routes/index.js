var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET admin page */
router.get('/admin', ctrlMain.index);

module.exports = router;