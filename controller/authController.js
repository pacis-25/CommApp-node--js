const User = require('../Models/register');
const Chat = require('../Models/chat');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.jwt;


const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

   
    if (err.message === 'incorrect email') {
        errors.email = 'Email is not registered';
    }

    if (err.message === 'incorrect password') {
        errors.password = 'Incorrect password';
    }

   
    if (err.code === 11000) {
        errors.email = 'that email is registered';
        return errors;
    }

 
    if (err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {

            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, email, name) => {
    return jwt.sign({ id, email, name }, JWT_SECRET, {
        expiresIn: maxAge
    });
};

// register api
module.exports.register_get = (req, res) => {
    res.render('register');
}

// login api
module.exports.login_get = (req, res) => {
    res.render('login');
}

// log in api
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id, user.email, user.name);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

// chat api
module.exports.chat_post = (req, res) => {
    const token = req.cookies.jwt;
    let userToken = jwt.decode(token);
    userName = userToken.name
    const { msg, user } = req.body;

    Chat.create({
        message: msg,
        user: userName
    });
    res.redirect('/chat');

}
