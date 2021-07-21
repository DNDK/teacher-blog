import React from 'react';

function Header(){
    return(
        <div className = "header noselect">
            <img src = "/logo.png" className = "logo-img"/>
            <span className = "logo-text">Блог Учителя</span>
        </div>
    )
}

export default Header