import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "./comments";

let axios = require("axios");
let parser = new DOMParser();

function Consultation() {
    let [article, setArticle] = useState({});
    let { id } = useParams();
    useEffect(() => {
        axios.get(`/api/consultations/${id}`).then(res => {
            setArticle(res.data);
        })
    }, [])
    return (
        <div className = "content">
            <h1>{article.title}</h1><br />
            <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
            {article.comments ? <Comments article={article} url={"/api/consultations"} /> : null}
        </div>
    )

}

export default Consultation;