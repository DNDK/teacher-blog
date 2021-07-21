import React, {useState, useEffect} from "react";
import autosize from "autosize";

let axios = require("axios");
let path = require('path')

function Comment(props){
    let [state, setState] = useState({
        replies: [],
        showForm: false
    });
    useEffect(()=>{
        axios.get(`/api/comments/${props.comment._id}`).then(res=>{
            console.log(res);
            setState({replies: res.data.replies, showForm: false});
        })
    }, [])
    console.log(state.replies)
    let date = new Date(Date.parse(props.comment.date));
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    let formattedDate = `${day}.${month}.${year}`;

    return(
        <div className = "comment">
            <span 
            className = {props.comment.isAdmin ? "admin-comment" : null}>
                {props.comment.author} 
                {props.comment.isAdmin ?  <span className = "admin-label"> • Автор </span> : null}
            </span>
            
            <p>{props.comment.body}</p>
            <small className = "date">{formattedDate}</small>

            <div className = "replies">
                    {state.replies.map((repl)=>{

                        let date = new Date(Date.parse(repl.date));
                        let year = date.getFullYear();
                        let month = date.getMonth() + 1;
                        month = month >= 10 ? month : '0' + month;
                        let day = date.getDate();
                        day = day >= 10 ? day : '0' + day;
                        let formattedDate = `${day}.${month}.${year}`;

                        return (
                        <div className = "reply">
                            <span className = {repl.isAdmin ? "admin-comment" : null}>
                                    {repl.author}
                                    {repl.isAdmin ? <span className="admin-label"> • Автор </span> : null}
                            </span>
                            <p>{repl.body}</p>
                            <small className = "date">{formattedDate}</small>
                        </div>)
                    })}
            </div>
            {state.showForm ? <ReplyForm comment = {props.comment} url = {props.url}/> : null}
            <button 
            className = "comment-button" 
            onClick = { state.showForm ? 
            ()=>{setState({replies: state.replies, showForm: false})}
            :
            ()=>{setState({replies: state.replies, showForm: true})}
            }
            >
            {state.showForm ? "Скрыть" : "Ответить"}
            </button>
        </div>
    )
}

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            author: "",
            body: "",
            isAdmin: false,
            articleId: props.article._id
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        autosize(document.querySelector(".comment-body-input"))
    }

    handleInputChange(evt){
        const name = evt.target.name;
        const value = evt.target.value;

        this.setState({
            [name]: value,
        })
    }

    handleSubmit(evt){
        evt.preventDefault();
        axios({
            url: path.join(this.props.url, "comment"),
            method: "post",
            data: this.state
        }).then(res=>{
            console.log(res);
        })
        window.location.reload(true);
        return false;
    }

    render(){
        return(
            <div className = "comment-form">
            <h4>Оставьте комментарий</h4>
            <form id = "comment-form" onSubmit = {this.handleSubmit}>
                <input 
                name = "author" 
                placeholder = "Ваше имя" 
                type = "text" 
                className = "name-input"
                onChange = {this.handleInputChange}
                /><br/>
                <textarea
                className = "comment-body-input" 
                name = "body" 
                placeholder = "Ваш комментарий" 
                onChange = {this.handleInputChange}
                ></textarea><br/>
                <input type = "submit" className = "comment-button" value = "Отправить"></input>
            </form>
            </div>
        )
    }
}

class ReplyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            body: "",
            isAdmin: false,
            commentId: props.comment._id
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        autosize(document.querySelectorAll(".comment-body-input"))
    }

    handleInputChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;

        this.setState({
            [name]: value,
        })
    }

    handleSubmit(evt) {
        evt.preventDefault();
        axios({
            url: path.join(this.props.url, "reply"),
            method: "post",
            data: this.state
        }).then(res => {
            console.log(res);
        })
        window.location.reload(true);
        return false;
    }

    render() {
        return (
            <div className="comment-form">
                <h5>Ответить</h5>
                <form id="comment-form" onSubmit={this.handleSubmit}>
                    <input
                        name="author"
                        placeholder="Ваше имя"
                        type="text"
                        className="name-input"
                        onChange={this.handleInputChange}
                    /><br />
                    <textarea
                        className="comment-body-input"
                        name="body"
                        placeholder="Ваш комментарий"
                        onChange={this.handleInputChange}
                    ></textarea><br />
                    <input type="submit" className="comment-button" value="Отправить"></input>
                </form>
            </div>
        )
    }
}


export default function Comments(props){
    console.log(props.article);
    return(
        <div className = "comment-section">
            <h3>Комментарии</h3>
            <CommentForm article = {props.article} url = {props.url}/>
            {props.article.comments.map(comm=>{
                return <Comment comment = {comm} url = {props.url}/>
            })}
        </div>
    )
}