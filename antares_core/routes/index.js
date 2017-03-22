var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET admin page */
router.get('/', ctrlMain.index);

router.get('/query', ctrlMain.query);

router.get('/create', ctrlMain.create);

router.get('/update', ctrlMain.update);

module.exports = router;