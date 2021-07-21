const express = require("express");
const router = express.Router();

const Game = require("./db").Game;

router.use(function TimeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
})
router.get("/", async (req, res) => {
    Game.find().exec((err, articles) => {
        if (err)
            throw err;
        let page = parseInt(req.query.page);
        console.log(req.query.page);
        let pages = [];
        while (articles.length) {
            pages.push(articles.splice(0, 10));
        }
        res.send({
            games: pages[page],
        });
    })
})

router.get("/:id", async (req, res) => {
    Game.findOne({ _id: req.params.id }).exec((err, game) => {
        if (err) throw err;
        res.send(game);
    })
})

module.exports = router