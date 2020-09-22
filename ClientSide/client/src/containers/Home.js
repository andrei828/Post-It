import React from 'react';
import './App.css';
import './Home.css';
import Nav from './Nav.js';
import { Button } from "../components/Button"
import Footer from "../components/Footer"
import icons from './Images/all_iconscpy.png'
import icon1 from '../components/Assets/social.png';
import icon2 from '../components/Assets/monitoring.png';
import icon3 from '../components/Assets/creative.png';
import blob from '../components/Assets/blob_shape.png';

const navOptions = [
    {option: 'Home'},
    {option: 'About us'},
    {option: 'Log In'},
    {option: 'Sign Up'},
  ];

const iconsStyle = {
  width: "70%",
  
  position: "relative",
  left: "-20%",
  maxHeight: "100vh"
}


const iconStyle = {
  zIndex: "10",
  width: "55%",
  marginBottom: "8%"
}


function Home() {
  
    return (
      <div className="HomePage">
          <div className="HomePageContent">

            <Nav items={navOptions}></Nav>
            <div className="Isometric ">

              <div className="background">
                <img src={icons} alt="icons" style={iconsStyle}/>
              </div>
              
              <div className="firstContainer">
                <h1 className="title">BUSINESS</h1>

                <h2 className="subtitle">Make it real!</h2>

                <div className="text-box">
                  <p> Simultaneusly post content to multiple</p>
                  <p> social media sites, BI Service and ML </p>
                  <p> Insights for everyone in your organisation.</p>
                </div>
                <a href={"/register"}>
                  <Button 
                  type="button" 
                  buttonStyle="my--btn--primary--solid " 
                  buttonSize="my--btn--large">GET STARTED</Button>
                </a>
              </div>
            </div>

            <div className="myContainer">

              <h2 className="emphasize">Why PostIt?</h2>

              <div className="flexContainer">

                  <div className="container3Columns">
                    <img src={icon1} alt="social-media" style={iconStyle}/>
                    <p>View and manage all your social campaigns in a single  platform.</p>
                  </div>

                  <div className="container3Columns">
                    <img src={icon2} alt="monitoring" style={iconStyle}/>
                    <p>Our social media monitoring tools let you find out what your customers are doing, 
                        feeling, and thinking when it comes to your brand.
                    </p>
                  </div>

                  <div className="container3Columns">
                    <img src = {icon3} alt="creativity" style = {iconStyle}/>
                    <p>Make it easy for your entire team to create beautiful, engaging posts for every social network</p>
                  </div>
              </div>
            </div>
        </div>

        <div className="container2">
          <div className="container2Columns">
            <h2>Discover what's possible when you get social</h2>
            <p> PostIt has the tool you need to succeed on every social media.
                From building your brand to delivering customer care, keep the conversation flowing 
                seamlessly across public channels and private messages, publish content to the right 
                apps at the right time, track effectiveness in real time, and crank the volume on 
                your top-performing content just in one platform.
            </p>
          </div>
          <div className="container2Columns img">
            <img src={blob} alt="blob"/>
          </div>
        </div>

        <Footer></Footer>
      </div>
    );
}


export default Home;