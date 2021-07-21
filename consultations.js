const express = require("express");
const router = express.Router();

let { Consultation, Comment } = require("./db");

router.use(function TimeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
})

router.get("/", async (req, res) => {
    await Consultation.find().sort([['date', -1]]).exec((err, articles) => {
        if (err) throw err;
        console.log(req.query.page);
        let page = parseInt(req.query.page);
        let pages = [];
        while (articles.length) {
            pages.push(articles.splice(0, 10));
        }
        res.send({
            articles: pages[page],
            length: pages.length
        });
    })
})

router.get("/:id", async (req, res) => {
    await Consultation.findOne({ "_id": req.params.id }).exec((err, article) => {
        if (err) throw err;
        res.send(article);
    })
})

router.post("/comment", async (req, res) => {
    console.log(req.body)
    let comment = new Comment(req.body);
    comment.save();

    Consultation.findOne({ _id: req.body.articleId }).exec((err, article) => {
        if (err) throw err;
        article.comments.push(comment);
        article.save();

        res.send({ "message": "ok" })
    })
})


router.post("/reply", async (req, res) => {
    Comment.findOne({ _id: req.body.commentId }).exec((err, comment) => {
        if (err) throw err;
        comment.replies.push(req.body);
        comment.save();
        res.send({ message: "ok" });
    })
})

module.exports = router