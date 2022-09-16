const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Chat = require('./Models/chat');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db connection and jwt
const JWT_SECRET = process.env.jwt;
const MONGODB_URL = process.env.mongodb;
mongoose.connect(MONGODB_URL);



app.get('chat', function (req, res) {
  res.sendFile(__dirname + 'chat');
});

http.listen(process.env.PORT || 3001,  function() {
  var host = http.address().address
  var port = http.address().port
  console.log('App listening at http://%s:%s', host, port)
});

io.on('connection', (socket) => {
  socket.on('message', async (msg) => {
    try {
      const response = await Chat.create({ 
        name:msg.user,
        message: msg.message
                  });
      io.emit('message', {response})
  } catch (error) {
      console.log(error);
      throw error;
  }
  
  })
})


const registerRouter = require('./routes/register');
const registerSuccessRouter = require('./routes/registration-success');
const welcomeRouter = require('./routes/welcome');
const loginSuccessRouter = require('./routes/login-success');
const loginRouter = require('./routes/login');
const usersListRouter = require('./routes/user-list');
const editUserRouter = require('./routes/edit-user');
const chatRouter = require('./routes/chat');
const docsListRouter = require('./routes/docs-list');
const logoutRouter = require('./routes/logout');
const shareRouter = require('./routes/share');




// view engine setup


app.use('/', registerRouter);
app.use('/', registerSuccessRouter);
app.use('/welcome', welcomeRouter);
app.use('/login-success', loginSuccessRouter);
app.use('/', loginRouter);
app.use('/user-list', usersListRouter);
app.use('/edit-user', editUserRouter);
app.use('/', chatRouter);
app.use('/', docsListRouter);
app.use('/logout', logoutRouter);
app.use('/share', shareRouter);



module.exports = app;
