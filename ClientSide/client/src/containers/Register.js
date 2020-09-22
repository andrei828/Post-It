/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  homeButton,
  loginButton,
  inputStyle,
  HeaderBar,
  HeaderLogIn,
} from '../components';
import { register } from '../serviceWorker';

const title = {
  pageTitle: 'Register Screen',
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      messageFromServer: '',
      showError: 0,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  registerUser = async (e) => {
    e.preventDefault();
    const {
        username, password, passwordConfirmation
    } = this.state;

    if (password != passwordConfirmation){
      return
    }

    if (username === '' || password === '' || passwordConfirmation === '') {
      this.setState({
        showError: "err_empty_entries",
      });
    } else {
      console.log(username, password)
      try {
        const response = await axios.post(
          'http://localhost/api/register', { username, password }
        );

        this.setState({
          messageFromServer: response.data.message,
          showError: false,
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

  // eslint-disable-next-line consistent-return
  render() {
    const {
      username,
      password,
      passwordConfirmation,
      messageFromServer,
      showError,
    } = this.state;

    if (messageFromServer === '') {
      return (
        <div>
          <HeaderLogIn/>
          <h3 className="login-subtitle">Sign up with username and password.</h3>   

          <form className="profile-form" onSubmit={this.registerUser}>
            <div>
              <TextField
                style={inputStyle}
                id="username"
                label="Username"
                value={username}
                onChange={this.handleChange('username')}
                placeholder="Username"
              />
            </div>
            <div>
              <TextField
                style={inputStyle}
                id="password"
                label="Password"
                value={password}
                onChange={this.handleChange('password')}
                placeholder="Password"
                type="password"
              />
            </div>
            <div>
              <TextField
                style={inputStyle}
                id="passwordConfirmation"
                label="Confirm password"
                value={passwordConfirmation}
                onChange={this.handleChange('passwordConfirmation')}
                placeholder="Password"
                type="password"
              />
            </div>
          <br/>
          <SubmitButtons buttonStyle={registerButton} buttonText="Register" />
          </form>
          <div>
            <h5 className="footer-message">Already have an account?
              <a href="/login"> Log In</a> 
            </h5>
          </div>
          



          {showError == "err_empty_entries" && (
            <div>
              <p>Username, password and email are required fields.</p>
            </div>
          )}
          {showError == "err_unknown" && (
            <div>
              <p>Something went wrong. Please try again later.</p>
            </div>
          )}
          {showError == "err_taken" && (
            <div>
              <p>
                That username or email is already taken. Please choose another
                or login.
              </p>
              <LinkButtons
                buttonText="Login"
                buttonStyle={loginButton}
                link="/login"
              />
            </div>
          )}
          {password !== passwordConfirmation && (
            <div>
              Passwords don't match.
            </div>

          )}


        </div>
      );
    }
    if (messageFromServer === 'user created') {
      return (
        <div>
          <HeaderLogIn/>
          <h3>User successfully registered!</h3>
          <LinkButtons
            buttonText="Go Login"
            buttonStyle={loginButton}
            link="/login"
          />
        </div>
      );
    }
  }
}

export default Register;