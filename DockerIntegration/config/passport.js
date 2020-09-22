const FACEBOOK_APP_ID = '[YOUR_OWN_ID]'
const FACEBOOK_APP_SECRET = '[YOUR_OWN_SECRET]'

const REDDIT_APP_ID = '[YOUR_OWN_ID]'
const REDDIT_APP_SECRET = '[YOUR_OWN_SECRET]'

const TWITTER_APP_ID = '[YOUR_OWN_ID]';
const TWITTER_APP_SECRET = '[YOUR_OWN_SECRET]';

const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const LocalStrategy = require('passport-local').Strategy
const RedditStrategy = require('passport-reddit').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const jwtSecret = require('./jwtConfig')
const User = require('../models/User')

const facebookPost = require('../facebookPost/postOnFacebook')

function formatUsername(username){
    //usernames are not case sensitive, lower it
    formattedUsername = username.toLowerCase()

    return formattedUsername
}

// creates the response, assuming success
function createResponse(){
    resp = {success: true}
    return resp
}

// sets the error message
function setResponseError(resp, err, errcode){
    if (!errcode){
        errcode = "err_unknown"
    }
    resp.success = false
    resp.message = err
    resp.errorcode = errcode
}


module.exports = function(multiPassport) {

    multiPassport.serializeUser(function(user, cb) {
        console.log("serialize")
        cb(null, user.id)
    });
      
    multiPassport.deserializeUser(function(id, cb) {
        console.log("deserialize")
        User.findById(id, function(err, user) {
            cb(err, user)
        })
    });



    multiPassport.use('local-login', new LocalStrategy({
        passReqToCallback : true,
        session: false
    },
    function(req, _username, _password, cb) {
        
        //format the username according to our rules
        _username = formatUsername(_username)
        
        process.nextTick(function() {
            User.findOne({username: _username}, function(err, user) {
                //create the response
                response = createResponse()

                //something went wrong getting the user
                if (err) {
                    setResponseError(response, err)
                    return cb(response)
                }

                //we didn't find the user
                if (!user) {
                    setResponseError(response, "No user found.", "err_wrong_combo")
                    return cb(response)
                }

                //we found the user, but the password was wrong
                if (!user.validPassword(_password)){
                    setResponseError(response, "Wrong password.", "err_wrong_combo")
                    return cb(response)
                }

                //everything ok, return the user data
                response.user = user

                return cb(response)

            });
        })
    }));

    multiPassport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback : true,
        session: false
    },
    function(req, _username, _password, cb) {
        //format the username according to our rules
        _username = formatUsername(_username)

        process.nextTick(function() {
            //create the response
            response = createResponse()

            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({username: _username}, (error, result) => {
                    //something went wrong while checking if the username already exists
                    if (error){
                        setResponseError(response, "An error occured while checking if the username already exists")
                        return cb(response)
                    }
                    //the username already exists
                    if (result){
                        setResponseError(response, "That username is taken.", "err_taken")
                        return cb(response)
                    }

                    //everything ok, we can add the user to the database

                    //create the user object
                    newUser = new User
                    newUser.username = _username,
                    newUser.password = newUser.generateHash(_password)

                    //save the user
                    newUser.save((error) => {
                        if (error){
                            setResponseError(response, `Failed to add the new user to database: ${newUserData}`)
                            return cb(response)
                        }

                        //all good, return success along with user information
                        response.user = newUser
                        return cb(response)
                    })

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
                        newUser.username = _username,
                        newUser.password = newUser.generateHash(_password)
                        newUser.save((error) => {
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
    }));
    
    multiPassport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: '/return/facebook',
        passReqToCallback : true 
    },
    function(req, accessToken, refreshToken, profile, cb) {
        const userId = JSON.parse(Object.values(req.sessionStore.sessions)[0]).passport.user
        facebookPost.getAllPages(profile.id, accessToken, (pages) => {
            // console.log(pages)
            User.findByIdAndUpdate({_id: userId}, {
                facebookId: profile.id,
                facebookToken: accessToken,
                facebookUsername: profile.displayName, 
                facebookPagesList: pages
                // TODO: don't forget to add expiration date for token
            },
            { useFindAndModify: false },
            (error, result) => {
                return cb(error, result)
            })
        })  
    }));

    multiPassport.use(new TwitterStrategy({
        consumerKey: TWITTER_APP_ID,
        consumerSecret: TWITTER_APP_SECRET,
        callbackURL: 'http://localhost/return/twitter',
        passReqToCallback: true
    },
    function (req, token, tokenSecret, profile, cb) {
        const userId = JSON.parse(Object.values(req.sessionStore.sessions)[0]).passport.user;
        User.findByIdAndUpdate({_id: userId}, {
            twitterId: profile.id,
            twitterToken: token,
            twitterTokenSecret: tokenSecret,
            twitterUsername: profile.username, 
            // TODO: don't forget to add expiration date for token
        },
        { useFindAndModify: false },
        (error, result) => {
            return cb(error, result)
        })
    }));

    multiPassport.use(new RedditStrategy({
        clientID: REDDIT_APP_ID,
        clientSecret: REDDIT_APP_SECRET,
        callbackURL: 'http://127.0.0.1:80/return/reddit',
        passReqToCallback : true
      },
      function(req, accessToken, refreshToken, profile, cb) {
        console.log("Tokens:")
        console.log(accessToken)
        console.log(refreshToken)
        const userId = JSON.parse(Object.values(req.sessionStore.sessions)[0]).passport.user
        User.findByIdAndUpdate({_id: userId}, {
            redditId: profile.id,
            redditToken: accessToken,
            redditUsername: profile.name, 
            // TODO: don't forget to add expiration date for token
        },
        { useFindAndModify: false },
        (error, result) => {
            return cb(error, result)
        })
      }
    ));

    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: jwtSecret.secret,
    };

    multiPassport.use(
        'jwt',
        new JWTstrategy(opts, (jwt_payload, done) => {
            console.log("IN PASSPORT")
            console.log(jwt_payload.id)
          try {
            User.findOne({
                _id: jwt_payload.id,
            }).then(user => {
              if (user) {
                console.log('user found in db in passport');
                done(null, user);
              } else {
                console.log('user not found in db');
                done(null, false);
              }
            });
          } catch (err) {
            done(err);
          }
        }),
      );
}

// https://not-an-aardvark.github.io/reddit-oauth-helper/