const express = require("express");
let { About } = require("./db");

const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get("/", async (req, res) => {
    About.findOne({}).exec((err, about) => {
        if(err) throw err;
        res.send({text: about.text});
    })
})

module.exports = router