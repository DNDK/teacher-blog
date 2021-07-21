import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

let axios = require("axios");

function Game() {
    let [game, setGame] = useState({});
    let { id } = useParams();
    useEffect(() => {
        axios.get(`/api/games/${id}`).then(res => {
            setGame(res.data);
        })
    }, [])
    return (
        <div className = "content">
            <h1>{game.name}</h1><br />
            <iframe src = {game.iframeSrc}></iframe>
            
        </div>
    )

}

export default Game;