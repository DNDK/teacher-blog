let express = require("express");
let router = express.Router();

router.use(function timeLog(req, res, next) {
    let date = new Date(Date.now())
    console.log('Time: ', date.getMonth())
    next()
})

let Comment = require("./db").Comment


router.get("/", async (req, res) => {
    await Comment.find().sort([['date', -1]]).exec((err, comments) => {
        if (err) throw err;
        console.log(req.query.page)
        let pages = [];
        while (comments.length) {
            pages.push(comments.splice(0, 10));
        }
        res.send({
            Comments: pages,
        });
    })
})


router.get("/:CommentId", async (req, res) => {
    await Comment.findOne({ _id: req.params.CommentId }).exec((err, comment) => {
        if (err) throw err;
        res.send(comment);
    })
})


module.exports = router;