import React from "react"
import logo from './logo.png';
import "./login.css";



function HeaderLogIn(){
    return (
        <header className="login-header">
            <a href="/">
                <img className = "logo" src = {logo} alt = "Logo"></img>
            </a>
            <div className="black-bar">.</div>  
        </header>
        
    )
}


export default HeaderLogIn