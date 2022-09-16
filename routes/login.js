var express = require('express');
var router = express.Router();

const authController = require('../controller/authController');

//GET API
router.get('/login', authController.login_get);

//POST API
router.post('/login', authController.login_post);

module.exports = router;
