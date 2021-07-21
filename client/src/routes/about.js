import React, {useState, useEffect} from "react";

let axios = require('axios');

export default function About(){
    const [text, setText] = useState();
    useEffect(()=>{
        axios.get("/api/about").then(res=>{
            setText(res.data.text);
        })
    }, [])

    return(
        <div className = "content">
            <h1>Обо мне</h1>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
    )
}