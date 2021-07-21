const cors = require('cors');

const express = require("express");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());


let news = require("./news")
let classes = require("./classes");
let uploads = require("./uploads");
let consultations = require("./consultations");
let exercises = require("./exercises");
let games = require("./games");
let links = require("./links");
let comments = require("./comments");
let about = require("./about");
let path = require("path");




app.use("/api/news", news);
app.use("/api/classes", classes);
app.use("/api/uploads", uploads);
app.use("/api/consultations", consultations);
app.use("/api/exercises", exercises);
app.use("/api/games", games);
app.use("/api/links", links);
app.use("/api/comments", comments);
app.use("/api/about", about);

app.get("/api/getDate", (req, res)=>{
    res.send({date: Date.now()});
});

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(process.env.PORT || 8000, ()=>console.log("listening " + process.env.PORT));