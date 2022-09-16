const express = require('express');
const router = express.Router();
const { requireAuth } = require('../Middleware/authMiddleware')
const authController = require('../controller/authController');


const salt = 10;
const bcrypt = require('bcryptjs');
const User = require('../Models/register');



router.get('/register', authController.register_get);

/* POST API */
router.post('/register', async (req, res) => {
        const { name, email, password: plainTextPassword } = req.body;
        const password = await bcrypt.hash(plainTextPassword, salt);
        const confirmpassword = password;
        console.log(password);

        try {
            const user = await User.create({ name, email, password, confirmpassword });
            return res.redirect('/registration-success');
        }
        catch (err) {
            console.log(err);

        }
    
});



module.exports = router;