/* eslint-disable no-console */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  homeButton,
  loginButton,
  forgotButton,
  inputStyle,
  HeaderBar,
  HeaderLogIn,
} from '../components';



class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      showError: 0,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username === '' || password === '') {
      this.setState({
        showError: "err_empty_entries",
        loggedIn: false,
      });
    } else {
      try {
        const response = await axios.post('http://localhost/api/login', {
          username,
          password,
        });
        console.log("yeah")
        console.log(response)
        localStorage.setItem('JWT', response.data.token);
        this.setState({
          loggedIn: true,
          showError: false,
          showError: 0,
        });
      } catch (error) {
        console.error(error)
        console.log(error.response)
        
        this.setState({
          showError: error.response.data.errorcode
        })
      }
    }
  };

  render() {
    const {
      username,
      password,
      showError,
      loggedIn,
      showNullError,
    } = this.state;
    if (!loggedIn) {
      return (
        <div>
          <HeaderLogIn/>
          <h3 className="login-subtitle">To continue, log in to PostIt.</h3>   

          <form className="profile-form" onSubmit={this.loginUser}>
            <div> 
              <TextField
                className="text-field"
                style={inputStyle}
                label="username"
                id="username"
                variant="standard"
                size="small"
                value={username}
                onChange={this.handleChange('username')}
                placeholder="Username"
              />
            </div>
            <div>
              <TextField
                className="text-field"
                style={inputStyle}
                id="password"
                label="password"
                value={password}
                onChange={this.handleChange('password')}
                placeholder="Password"
                type="password"
              />
            </div>
            <SubmitButtons buttonStyle={loginButton} buttonText="Login" />
          </form>
          {showError == "err_empty_entries" && (
            <div>
              <p>The username and password cannot be null.</p>
            </div>
          )}
          {showError == "err_unknown" && (
            <div>
              <p>Something went wrong. Please try again later.</p>
            </div>
          )}
          {showError == "err_wrong_combo" && (
            <div>
              <p>
                That username and password combination isn&apos;t recognized. Please try
                again or register now.
              </p>
              <LinkButtons
                buttonText="Register"
                buttonStyle={loginButton}
                link="/register"
              />
            </div>
          )}
          <a href="/forgotPassword">Forgot password</a>
          <hr style={{align: "center", width:"50%", marginLeft: "auto", marginRight: "auto" }}/>
          <h3 className="login-subtitle">Please register if you don't have an account.</h3>   
          <LinkButtons
                buttonText="Register"
                buttonStyle={registerButton}
                link="/register"
              />
        </div>
      );
    }
    return <Redirect to={`/userProfile`} />;
  }
}

export default Login;