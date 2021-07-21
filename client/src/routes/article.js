import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Comments from "./comments";

let axios = require("axios");

function Article(){
    let [article, setArticle] = useState({});
    let { id } = useParams();
    useEffect(()=>{
        axios.get(`/api/news/${id}`).then(res=>{
            setArticle(res.data);
        })
    }, [])
    return(
        <div className = "content">
            <h1>{article.title}</h1><br/>
            <div dangerouslySetInnerHTML = {{__html:article.body}}></div>

            {article.comments ? <Comments article = {article} url = {"/api/news"}/> : null}
        </div>
    )

}

export default Article;