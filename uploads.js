const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./media")
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-'+Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

const router = express.Router();

router.use(function TimeLog(req, res, next){
    console.log("Time:", Date.now());
    next();
})



router.post("/", upload.single("image"), async (req, res)=>{
    if(req.file){
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        let pathToFile = fullUrl +'/'+ req.file.filename
        res.send({pathToFile})
    }else{
        console.log(req.body)
        res.status(400)
        res.send({"message": "No file found in request"})
    }
})

router.get("/:name", async(req, res)=>{
    let filepath = `${__dirname}/media/${req.params.name}`
    try{
        if(fs.existsSync(filepath)){
            res.sendFile(filepath);
        }
        else{
            res.status(404);
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router