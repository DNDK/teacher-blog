var mongoose = require('mongoose');

var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//news

let comment = new mongoose.Schema({
    author: String,
    isAdmin: Boolean,
    body: String,
    date: { type: Date, default: Date.now },
    replies: [{
        author: String,
        isAdmin: Boolean,
        body: String,
        date: { type: Date, default: Date.now },
    }]
})

const Comment = mongoose.model('Comment', comment)

let article = new mongoose.Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    comments: [comment]
})

const Article = mongoose.model('Article', article);



let classs = new mongoose.Schema({
    title: String,
    body: String,
    date: {type: Date, default: Date.now },
    comments: [comment]
});

const Class = mongoose.model('Class', classs);

let consultation = new mongoose.Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    comments: [comment]
});

const Consultation = mongoose.model('Consultation', consultation);

let game = mongoose.Schema({
    name: String,
    iframeSrc: String

});

const Game = mongoose.model('Game', game);

let exercise = new mongoose.Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    comments: [comment]
})

const Exercise = mongoose.model('Exercise', exercise);

let link = new mongoose.Schema({
    name: String,
    src: String
});

const Link = mongoose.model('Link', link);

let about = new mongoose.Schema({
    text: String
})

const About = mongoose.model('About', about);

exports.Article = Article;
exports.Class = Class;
exports.Consultation = Consultation;
exports.Game = Game;
exports.Exercise = Exercise;
exports.Link = Link;
exports.Comment = Comment;
exports.About = About;
