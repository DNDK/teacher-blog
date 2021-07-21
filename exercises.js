const express = require("express");
const router = express.Router();

let { Exercise, Comment } = require("./db");

router.use(function TimeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
})

router.get("/", async (req, res) => {
    await Exercise.find().sort([['date', -1]]).exec((err, articles) => {
        if (err) throw err;
        let pageNum = parseInt(req.query.page);
        let pages = [];
        while (articles.length) {
            pages.push(articles.splice(0, 10));
        }
        res.send({
            articles: pages[pageNum],
            length: pages.length
        });
    })
})

router.get("/:id", async (req, res) => {
    await Exercise.findOne({ "_id": req.params.id }).exec((err, article) => {
        if (err) throw err;
        res.send(article);
    })
})

router.post("/comment", async (req, res) => {
    console.log(req.body)
    let comment = new Comment(req.body);
    comment.save();

    Exercise.findOne({ _id: req.body.articleId }).exec((err, article) => {
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