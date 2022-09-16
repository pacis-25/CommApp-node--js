var express = require('express');
var router = express.Router();
const Uploads = require('../Models/uploads');
const User = require('../Models/register');
const { checkUser, requireAuth } = require('../Middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// fetch data to display in front end
router.get('/:id', checkUser, requireAuth, (req, res) => {
    let uploadId = req.params.id;
    const token = req.cookies.jwt;
    let decodedToken = jwt.decode(token);
    Uploads.findById(uploadId).then((upload) => {
        User.find({}, (err, userlist) => {
            res.render('share', {
                usersList: userlist,
                upload
            })
        })
    }).catch((error) => {
    });

})

router.get('/', requireAuth, (req, res) => {
    res.render('share');
})


// to share file
router.post('/:id', async (req, res) => {
    const token = req.cookies.jwt;
    let decodedToken = jwt.decode(token);
    let file_id = req.params.id;
    try {
        const upload = await Uploads.findByIdAndUpdate(
            { _id: file_id },
            {
                $push: {
                    sharedUser: {
                        SharerId: decodedToken.id,
                        sharerEmail: decodedToken.email,
                        sharedName: req.body.receiver,
                        fileName: req.body.myfile,
                        label: req.body.myLabel
                    }
                }
            },
            { new: true, useFindAndModify: false }
        );

        res.redirect(`/share/${file_id}`);
    }
    catch (error) {
        console.log(error);
    }
})


// remove share
router.get('/:id1/:id', async (req, res) => {
    let fileID = req.params.id1;
    let fileID2 = req.params.id;

    try {
        const upload = await Uploads.findByIdAndUpdate(
            { _id: fileID },
            {
                $pull: {
                    sharedUser: { _id: fileID2 }
                }
            },
            { new: true, useFindAndModify: false }
        );
        res.redirect(`/share/${fileID}`)
    }
    catch (error) {
        console.log(error);
    }

})



module.exports = router;