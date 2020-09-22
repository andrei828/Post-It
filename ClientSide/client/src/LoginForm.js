import React, { Component } from 'react'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''}
        // this.handleChange = this.handleChange.bind(this, field);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(field, event) {
        if (field === 'username') 
        // console.log(event)
        // console.log(field)
            this.setState({username: event.target.value})
        else if (field === 'password') {
            this.setState({password: event.target.value})
        }
    }

    loginUser() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }

        fetch('http://localhost/api/signup', requestOptions)
            .then(res => console.log(res))
            .catch(error => console.log(error))

    }

    handleSubmit(event) {
        event.preventDefault()
        this.loginUser()
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange.bind(this, 'username')} type="text" name="username"/><br/>
                <input onChange={this.handleChange.bind(this, 'password')} type="password" name="password"/><br/>
                <button>Submit</button>
            </form>
        )
    }
}

export { LoginForm }