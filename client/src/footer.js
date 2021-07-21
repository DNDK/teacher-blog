import React, {useState, useEffect} from 'react';

let axios = require('axios');

export default function Footer(){
    let [date, setDate] = useState();
    useEffect(()=>{
        axios.get("/api/getDate").then(res=>{
            setDate(res.data.date)
        })
    }, [])
    let currdate = new Date(date)
    return(
        <div className = "footer">
            <div className="header noselect footer-logo">
                <img src="/logo.png" className="logo-img footer-logo-img" />
                <span className="logo-text footer-logo-text">Блог Учителя</span>
            </div>
            <div className = "footer-copyright">
                &copy; О. А. Дубовец, {currdate.getFullYear()}
            </div>
        </div>
    )
}