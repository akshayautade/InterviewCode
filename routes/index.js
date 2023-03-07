const ex = require("express");
const User = require("../models/user");
const router = ex.Router();

router.get("/users", async (req, res) => {
    try {
        const search = req.query.search || "";
        const searchBy = req.query.searchBy || "";
        console.log(search);
        let users
        if (searchBy == "first_name")
            users = await User.find({ first_name: { $regex: search, $options: "i" } });
        if (searchBy == "last_name")
            users = await User.find({ last_name: { $regex: search, $options: "i" } });
        if (searchBy == "email")
            users = await User.find({ email: { $regex: search, $options: "i" } });
        if (searchBy == "phone")
            users = await User.find({ phone: { $regex: search, $options: "i" } });
        if(searchBy == "" || search == "")
            users = await User.find();
        res.json(users);
    } catch (err) {
        res.json(err);
    }
})

router.get("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        res.json(user);
    } catch (err) {
        res.json(err);
    }
})


router.post("/user", async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
})

router.delete("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId)
        if (user) {

            const res = await User.remove({ "_id": userId }, req.body);
            res.status(200).json({
                message: "done"
            });
        }
    } catch (err) {
        res.json(err);
    }
})

router.put("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.updateOne({ "_id": userId }, req.body);
        res.json(user);
    } catch (err) {
        res.json(err);
    }
})

module.exports = router;