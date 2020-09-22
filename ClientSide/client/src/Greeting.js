import React, { Component } from 'react'

function CustomGreeting(props) {
    if (props.loggedIn) 
        return <p>Welcome, user!</p>
    return <p>You need to sign in...</p>
}

class Greeting extends Component {
    constructor(props) {
        super(props)
        this.state = { loggedIn: props.loggedIn }
    }

    render() {
        return <CustomGreeting loggedIn={this.state.loggedIn} />
    }
}

export { Greeting }