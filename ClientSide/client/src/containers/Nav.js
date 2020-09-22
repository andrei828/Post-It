import React from 'react';
import './App.css';
import logo from './Images/logo.png';
 
const logoStyle = {
    width: "56%",
    padding: "5% 12% 5%",
    position: "relative",
    zIndex: "12"
};
 
const navLinkStyle = {
    paddingLeft: "5.5rem",
    paddingRight: "1.5rem"
}
 
function Nav({items}) {
    return (
        <div className = "navbar navbar-light">
            <nav className = "navbar justify-content-start">
                <a href="/">
                    <img className="logoPostit" src = {logo} alt = "Logo" style = {logoStyle}/>
                </a>
            </nav>
            
            <nav className = "nav justify-content-end">
                {items.map( item => {
                    let path;
                    switch(item.option){
                        case "Sign Up":{
                            path = "/register";
                            break;
                        }
                        case "Home":{
                            path = "/"
                            break;
                        }
                        case "Contact Us":{
                            path = ""
                            break;
                        }
                        default:{
                            path = "/" + item.option.replace(/\s/g, '');
                            break;
                        }
                    }
                    return <a className = "nav-link active"  href = {path} style = {navLinkStyle}>
                            {item.option}
                           </a>
                    
                }
                )}
            </nav>
        </div>
    )
}
 
export default Nav;