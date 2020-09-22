import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'react-scroll-parallax';
import './App.css';
import Home from './Home.js';
import LogIn from './logIn.js';
import SignUp from './signUp.js'; 
import ContactUs from './contactUs.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path = "/" exact component = {Home} />
          <Route path = "/logIn" exact component = {LogIn} />
          <Route path = "/signUp" exact component = {SignUp} />
          <Route path = "/contactUs" exact component = {ContactUs} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
