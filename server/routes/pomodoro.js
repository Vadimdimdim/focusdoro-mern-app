const   express = require('express'),
        router = express.Router();

const { Settings } = require("../models/settings");
const { User } = require("../models/user");
const { auth } = require("../middleware/auth");

router.post("/getSettings", auth, (req, res) => {
    //Need to find if user already has settings
    Settings.findOne({'user': req.body.user})
        .exec((err, settings) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).json({ success: true, settings })
        })
});

router.post("/saveSettings", (req, res) => {
    const settings = new Settings(req.body)
    
    settings.save((err, settings) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true})
    })

});

router.post("/getDataByUsername", (req, res) => {
    //Need to find if user already has settings
    User.findOne({'username': req.body.username})
        .exec((err, user) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).json({ success: true, user })
        })
});

router.put('/updateSettings/:id', (req, res) => {
    Settings.findByIdAndUpdate({_id: req.params.id}, req.body)
        .exec((err, settings) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true})
        })
})

module.exports = router;