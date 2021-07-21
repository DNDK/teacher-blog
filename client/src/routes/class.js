import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "./comments";

let axios = require("axios");
let parser = new DOMParser();

function Class() {
    let [article, setArticle] = useState({});
    let { id } = useParams();
    useEffect(() => {
        axios.get(`/api/classes/${id}`).then(res => {
            setArticle(res.data);
        })
    }, [])
    return (
        <div className = "content">
            <h1>{article.title}</h1><br />
            <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
            {article.comments ? <Comments article={article} url={"/api/classes"} /> : null}
        </div>
    )

}

export default Class;