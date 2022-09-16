var express = require('express');
var router = express.Router();
const authController = require('../controller/authController');
const { checkUser, requireAuth } = require('../Middleware/authMiddleware');
const Uploads = require('../Models/uploads');
const jwt = require('jsonwebtoken');
const formidable = require("formidable");
const fs = require("fs");

/* GET users listing. */
router.get('/docs-list', checkUser, requireAuth, (req, res) => {
    Uploads.find({}, (err, uploads) => {
        res.render('docs-list', {
            uploadList: uploads
        })
    })
})


// edit
router.put('/docs-list/:id', async (req, res) => {
    let uploadedId = req.params.id;
    const response = await Uploads.findByIdAndUpdate(uploadedId, {
        $set: {
            label: req.body.labelName
        }, upset: true
    })
})

// delete
router.get('/docs-list/:id', async (req, res) => {
    let selectedID = req.params.id;
    const response = await Uploads.findByIdAndDelete(selectedID)
    res.redirect('/docs-list');
})

// upload
router.post('/docs-list', (req, res) => {
    const token = req.cookies.jwt;
    let userToken = jwt.decode(token);
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        var oldpath = files.filetoupload.filepath;
        var newpath = __dirname + "/uploads/" + files.filetoupload.originalFilename;
        fs.readFile(oldpath, function (err, data) { 
            if (err) throw err;
            Uploads.create({
                label: fields.labelName,
                fileName: files.filetoupload.originalFilename,
                sharerName: userToken.name,
                sharerEmail: userToken.email,
                sharerId: userToken.id
            })
            // write into the file 
            fs.writeFile(newpath, data, (err) => {
                if (err) throw err;
                res.redirect('/docs-list')
            })


        })
    })
})

router.get('/docs-list/download/:id', (req, res) => {
    let selectedID = req.params.id;
    Uploads.findById(selectedID).then(async (uploads, err) => {
        if (err) throw err;
        var uploadFolder = __dirname + "/uploads/" + uploads.fileName;
        res.download(uploadFolder);
    })
})

module.exports = router;