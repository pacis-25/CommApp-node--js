var express = require('express');
var router = express.Router();
const {requireAuth, checkUser} = require('../Middleware/authMiddleware');

/* GET home page. */
router.get('/', checkUser, (req, res, next) => {
  res.render('login-success');
});

module.exports = router;