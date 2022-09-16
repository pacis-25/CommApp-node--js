var express = require('express');
var router = express.Router();
const { checkUser, requireAuth } = require('../Middleware/authMiddleware');
const Chat = require('../Models/chat');
const jwt = require('jsonwebtoken');


router.get('/chat', checkUser, requireAuth, async (req, res) => {
  await Chat.find().then(chat => {
    res.render('chat', {
      chat
    })
  })
})

router.post('/chat', async (req, res) => {
  let ts = Date.now();
  let full_date = new Date(ts);
  let date = full_date.getDate();
  let month = full_date.getMonth() + 1;
  let year = full_date.getFullYear();
  let todayHour = new Date().toLocaleTimeString();

  const date_today = "[ " + year + ":" + month + ":" + date + " " + todayHour + " ]";
  const { message } = req.body;
  const token = req.cookies.jwt;
  let userToken = jwt.decode(token);
  const name = userToken.name;
  const response = await Chat.create({
    date_today,
    name,
    message
  })
  res.redirect('/chat');

})

router.get('/chat', (req, res, next) => {
  res.render('chat');
})


module.exports = router;