import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../components/Assets/robot_404_not_found.png';
import { Button } from "../components/Button";
import './App.css';


const robotStyle = {
    width: "90%",
    marginTop: "8%",
    marginRight: "10%",
    zIndex: "3"
}

const textStyle = {
    fontFamily: "Raleway",
    fontSize: "2em",
    color: " #99adff",
    textAlign: "center",
}

 const flexContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    float: "left",
    marginTop: "2%"
}

const container2Columns = {
    width: "50%",
    padding: "2%",
    marginTop: "3%",
    marginLeft: "2%",
    marginRight: "5%"
}

const title = {
    marginTop: "2%",
    textAlign: "center",
    fontFamily: "Raleway",
    fontWeight: "bold",
    fontSize: "4em",
    color: "#3a2aad",
}

const subtitle = {
    textAlign: "center",
    fontFamily: "Raleway",
    fontWeight: "bold",
    fontSize: "3em",
    color: "#3a2aad",
}

const msgStyle = {
    textAlign: "center",
    fontFamily: "Raleway",
    fontSize: "1.25em",
    color: "#3f5eab",
    padding: "6px",
    marginTop: "6%"
}


class NotFoundPage extends React.Component{
    render(){
        return <div style={flexContainer}>
            <div style={container2Columns}>
                <p style={title}>ERROR 404</p>
                <p style={subtitle}>PAGE NOT FOUND!</p>
                <p style={msgStyle}> Sorry, we couldn't find the page you were looking for.
                    We suggest that you return to main sections.
                </p>
                <Link to="/">
                    <Button type="button" buttonStyle="not--found" buttonSize="my--btn--medium">GO BACK HOME</Button>
                </Link>
            </div>
            <div>
                <img src={PageNotFound} style={robotStyle}/>
            </div>
          </div>;
    }
}

export default NotFoundPage;