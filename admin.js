const express = require("express");
const router = express.Router();


let Article = require("./db").Article;
let Note = require("./db").Note;
let User = require("./db").User

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

//singup
router.get("/signup", async(req, res)=>{
    res.send({token: req.csrfToken()})
})

router.post("/signup", async(req, res)=>{
    let user = new User(req.body);
    await user.save();
    res.send({message: "OK"});
})

//login
router.get("/login", async (req, res)=>{
    res.send({token: req.csrfToken()});
})

router.post("/login", async(req, res)=>{
    console.log("got a POST")
    if(!req.body.username || req.body.password_hash){
        res.send({
            message: "can't login"
        })
    }
    else{
        let user = User.findOne({username: req.body.username});
        if(req.body.password_hash !== user.password_hash || user == null){
            res.send({
                message: "can't login"
            })
        }
        else{
            let id = user._id;
            let username = user.username;
            let loggeduser = {
                id,
                username
            }
            req.session.user = loggeduser;
        }
    }
})

//news
router.get("/news", async (req, res)=>{
    
    res.send({token: req.csrfToken()});
})

router.post("/news", async(req,res)=>{
    console.log(req.body)
    let newArticle = new Article(req.body);
    await newArticle.save((err, a)=>{
        if(err) throw err;
    });
    return res.send("OK")
})

router.put("/news/:articleId", async (req, res) => {
    let article = await Article.findOne({ _id: req.params.articleId });
    let updt = req.body
    article.overwrite(updt);
    await article.save();
    res.send("OK")
    
})

router.delete("/news/:article", async (req, res) => {
    await Article.deleteOne({ _id: req.params.articleId }).exec();
    res.send("FUCK")
})

//notes
router.get("/notes", async (req, res) => {

    res.send({ token: req.csrfToken() });
})

router.post("/notes", async (req, res) => {
    console.log(req.body)
    let newNote = new Note(req.body);
    await newNote.save((err, a) => {
        if (err) throw err;
    });
    return res.send("OK")
})

router.put("/notes/:articleId", async (req, res) => {
    let note = await Note.findOne({ _id: req.params.articleId });
    let updt = req.body
    note.overwrite(updt);
    await Note.save();
    res.send("OK")

})

router.delete("/notes/:article", async (req, res) => {
    await Note.deleteOne({ _id: req.params.articleId }).exec();
    res.send("FUCK")
})


module.exports = router
