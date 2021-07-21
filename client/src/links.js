import React from 'react';
import {
    Link,
    Switch,
    Route,
    BrowserRouter as Router,
    Redirect
} from 'react-router-dom';



import About from "./routes/about"
import News from "./routes/news";
import Article from './routes/article';
import Classes from "./routes/classes"
import Class from "./routes/class"
import Consultations from './routes/consultations';
import Consultation from './routes/consultation';
import Exercises from './routes/exercises';
import Exercise from './routes/exercise';
import Games from "./routes/games";
import Game from "./routes/game";
import NavigationBar from './navigation-bar';
let createHistory = require("history").createBrowserHistory


const history = createHistory();
const Links = ()=>{
    return(
        <>
        <Router basename = "/" history = {history}>
            <NavigationBar />
            
            <Switch>
                <Route exact path = "/"><Redirect to = "/news"/></Route>
                <Route exact path = "/about"><About/></Route>
                <Route exact path = "/news" component = {News}/>
                <Route path = "/news/:id" component = {Article}/>
                <Route exact path = "/classes" component = {Classes} />
                <Route path = "/classes/:id" component = {Class}/>
                <Route exact path = "/consultations" component = {Consultations} />
                <Route path = "/consultations/:id" component = {Consultation}/>
                <Route exact path = "/exercises" component = {Exercises}/>
                <Route path = "/exercises/:id" component = {Exercise}/>
                <Route exact path="/games" component = {Games}/>
                <Route path="/games/:id" component = {Game}/>
            </Switch>
        </Router>
        </>
    )
}
export default Links