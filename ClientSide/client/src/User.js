import React, { Component } from 'react'
import { Greeting } from './Greeting.js'
import { LoginForm } from './LoginForm.js'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apiResponse: '',
            loggedIn: false,
        }
    }

    callAPI() {
        fetch("http://localhost/api")
            .then(res => res.text())
            .then(res => { 
                this.setState({ apiResponse: res }); 
                console.log(res)
            });
    }

    userLoggedIn(userData) {
        this.setState({user: userData})
    }

    componentDidMount() {
        this.callAPI()
    }

    render() {
        return (
            <div>
                <p>{this.state.apiResponse}</p>
                <Greeting loggedIn={this.state.loggedIn} />
                <LoginForm loginHandler={this.userLoggedIn} />
            </div>
        )
    }
}

export { User }