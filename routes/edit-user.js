var express = require('express');
var router = express.Router();
const { requireAuth } = require('../Middleware/authMiddleware');
const User = require('../Models/register');

// fetch user's name and email by id
router.get('/:id', requireAuth, (req, res) => {
  let userID = req.params.id;
  User.findById(userID).then((user) => {
    res.render('edit-user', { user })
  });
  console.log(userID);
})

// update users info

router.post('/:id', async (req, res) => {
  let userID = req.params.id;
  const { name, email } = req.body;
  const response = await User.findByIdAndUpdate(userID, {
    name,
    email
  })
  res.redirect('/user-list');
})

module.exports = router;
