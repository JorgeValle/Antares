// a constant is a variable that should be read-only after initial value is set
const express = require('express');
const router = express.Router();
// bring in controller
const updateCtrl = require('../controllers/update.controller');

// update specific, by id
router.put('/update/:id', updateCtrl.updateOneById);

module.exports = router;
