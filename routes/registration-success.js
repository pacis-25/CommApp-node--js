var express = require('express');
var router = express.Router();

router.get('/registration-success', (req, res, next) => {
    res.render('registration-success');
  });

  module.exports = router;