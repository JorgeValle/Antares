// a constant is a variable that should be read-only after initial value is set
const express = require('express');
const router = express.Router();
// bring in controller
const deleteCtrl = require('../controllers/delete.controller');

// delete content by id
router.delete('/delete/:id', deleteCtrl.deleteOneById);

module.exports = router;
