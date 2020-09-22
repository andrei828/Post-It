const User = require('../models/User')


exports.registerUserLocal = (req, _username, _password, cb) => {
    if (_username)
        _username = _username.toLowerCase()

    process.nextTick(function() {
        // if the user is not already logged in:
        if (!req.user) {
            User.findOne({username: _username}, (error, result) => {
                if (error) {
                    console.log('An error occured when checking if the username already exists')
                    return cb(error)
                }
                if (result) {
                    return cb(null, false, req.flash('signupMessage', 'That email is already taken.'))
                } else {
                    // can add a new user to database
                    newUser = new User;
                    const newUserData = {
                        username: _username,
                        password: newUser.generateHash(_password)
                    }
                    newUser(newUserData).save((error) => {
                        if (error) {
                            console.log(`Failed to add the new user to database: ${newUserData}`)
                            return cb(error)
                        }
                        return cb(null, newUser)
                    })
                }
            })
        // if the user is logged in but has no local account...
        } else if (!req.user.username) {
            // ...presumably they're trying to connect a local account
            // BUT let's check if the email used to connect a local account is being used by another user
            User.findOne({username: _username}, (error, result) => {
                if (error) {
                    console.log('An error occured when checking if the username already exists')
                    return cb(error)
                }
                if (result) {
                    return cb(null, false, req.flash('loginMessage', 'That email is already taken.'))
                } else {
                    
                    newUser = req.user;
                    const newUserData = {
                        username: _username,
                        password: newUser.generateHash(_password)
                    }
                    newUser(newUserData).save((error) => {
                        if (error) {
                            console.log(`Failed to add the new user to database: ${newUserData}`)
                            return cb(error)
                        }
                        return cb(null, newUser)
                    })
                }
            })
        } else {
            return cb(null, req.user)
        }
    })
}
