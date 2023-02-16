const ex = require("express");
const User = require("../models/user");
const router = ex.Router();
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        var doc = req.body;
        cb(null, Date.now().toString()+"-"+file.originalname)
    }
});
const upload = multer({ storage: storage });

router.get("/users", async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json(err);
    }
})

router.get("/user/:userId", async(req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        res.json(user);
    } catch (err) {
        res.json(err);
    }
})

router.post("/uploadFile",upload.array('file'), async(req, res) => {
        req.files.forEach(file => {
            console.log(file.filename);
        })
        res.json(req.files)
    
})

router.post("/user", async(req, res) => {
    const user = await User.create(req.body);
    res.json(user);
})

router.delete("/user/:userId", async(req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.remove({ "_id": userId }, req.body);
        res.status(200).json({
            message: "done"
        });
    } catch (err) {
        res.json(err);
    }
})

router.put("/user/:userId", async(req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.updateOne({ "_id": userId }, req.body);
        res.json(user);
    } catch (err) {
        res.json(err);
    }
})


module.exports = router;