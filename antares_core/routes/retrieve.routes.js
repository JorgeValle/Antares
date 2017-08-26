// a constant is a variable that should be read-only after initial value is set
const express = require('express');
const router = express.Router();
// bring in the controller
const retrieveCtrl = require('../controllers/retrieve.controller');

var jwt = require('express-jwt');
var auth = jwt({
  secret:'thisissecret',
  userProperty:'payload'
});

// get all, by content type
router.post('/get/:contentType', auth, retrieveCtrl.retrieveAllByContentType);

// get specific, by id
router.get('/get/:id', retrieveCtrl.retrieveOneByContentType);

module.exports = router;
