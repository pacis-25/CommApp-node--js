var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.render('logout');
});


module.exports = router;