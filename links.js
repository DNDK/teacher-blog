const express = require('express');
const router = express.Router();
const Link = require("./db").Link;

router.use(function TimeLog(req, res, next){
    console.log("Time: ", Date.now());
    next();
})

router.get('/', async(req, res)=>{
    Link.find().exec((err, links)=>{
        if(err) throw err;
        res.send(links);
    })
})

module.exports = router;