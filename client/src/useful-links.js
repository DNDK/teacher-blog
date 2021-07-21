import React, {useState, useEffect} from 'react';

let axios = require("axios");

export default function UsefulLinks(){
    let [links, setLinks] = useState([]);
    useEffect(()=>{
        axios.get("/api/links").then(res=>{
            setLinks(res.data);
        })
    }, [])

    return(
        <div className = "useful-links">
            <h3>Полезные ссылки</h3>
            {links.map(link=>{
                return(
                    <li>
                        <a href = {link.src} target = "_blank">{link.name}</a><br />
                    </li>
                )
            })}
        </div>
    )
}