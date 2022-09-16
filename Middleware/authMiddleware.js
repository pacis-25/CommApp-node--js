const jwt = require('jsonwebtoken');
const User = require('../Models/register');
const JWT_SECRET = process.env.jwt;


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // checking the token
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect('/login');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    })
  }
  else{
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkUser };