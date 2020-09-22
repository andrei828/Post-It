const crypto = require('crypto')
const User = require('./models/User')

const jwt = require('jsonwebtoken')
const jwtSecret = require('./config/jwtConfig')

const redditPost = require('./redditPost/postOnReddit')
const twitterPost = require('./twitterPost/postOnTwitter')
const facebookPost = require('./facebookPost/postOnFacebook')

var setCORSHeaders = function(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'Authorization') // If needed
}

module.exports = function(app, multiPassport) {

    app.get('/api',
    (req, res) => {
        setCORSHeaders(res)
        res.send("this is the api")
    });

    app.get('/api/logout', (req, res) => {
      console.log("entered logout")
      req.sessionStore.clear((err) => {
        console.log(req.session)
        console.log(req.sessionStore)
        res.status(200).send({
          message: 'logged out'
        })
      });
    })

    app.get('/api/login',
    (req, res) => {
        setCORSHeaders(res)
        res.render('login')
    });
    
    // app.get('/api/user',
    // (req, res) => setCORSHeaders(res), 
    // require('connect-ensure-login').ensureLoggedIn(),
    // (req, res) => {
    //     setCORSHeaders(res)
    //     res.send(req.user)
    // })

    app.post('/login',  
    (req, res) => setCORSHeaders(res),
    multiPassport.authenticate('local-login', { failureRedirect: '/login' }),
    (req, res) => {
        setCORSHeaders(res)
        res.redirect('/api/user');
    });

    //user signup
    app.post('/api/signup',
    (req, res) => setCORSHeaders(res),
    multiPassport.authenticate('local-signup', {
        successRedirect: '/api/user',
        failureRedirect: '/api',
        failureFlash: true
    }));

    //user login
    app.post('/api/login', (req, res, next) => {
      multiPassport.authenticate('local-login', (response) => {
        console.error("----LOGIN----")
        //we got no response, something went wrong
        if (!response){
          console.error("No response")
          res.status(400).send({message: "No response"})
          return
        }

        //debugging
        console.error("----------")
        console.error(response)
        console.error("----------")

        //something went wrong, tell the user
        if (!response.success) {
          console.error(`error ${response.message}`)

          res.status(400).send(response)
          return
        }

        //everything was ok, tell the user they are logged in
        const token = jwt.sign({id: response.user._id}, jwtSecret.secret)
        res.status(200).send({
          auth: true,
          token,
          message: 'user found & logged in'
        })

      })(req, res, next);
    });

    //register
    app.post('/api/register', (req, res, next) => {
      multiPassport.authenticate('local-signup', (response) => {
        console.error("----REGISTER----")
        //we got no response, something went wrong
        if (!response){
          console.error("No response")
          res.status(400).send({message: "No response"})
          return
        }

        //debugging
        console.error("----------")
        console.error(response)
        console.error("----------")

        //something went wrong, tell the user
        if (!response.success) {
          console.error(`error ${response.message}`)

          res.status(400).send(response)
          return
        }

        //everything ok

        req.logIn(response.user, error => {
          const data = {
            username: response.user.username,
          };
          User.findOne({
            username: data.username,
          }).then(user => {
            console.log(user);
            console.log('user created in db');
            res.status(200).send({ message: 'user created' });
          });
        });

      })(req, res, next);
    });
    
    function getLoginStatus(id) {
      if (id === undefined)
        return 'not logged in'
      return 'logged in'
    }

    //get user data
    app.get('/api/user', (req, res, next) => {
      multiPassport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
          console.log(err);
        }
        console.log('user:')
        console.log(user)

        if (info !== undefined) {
          console.log(info.message);
          res.status(401).send(info.message);
        } 
        //serach for the user
        User.findOne({
          _id: user._id,
        }).then((userInfo) => {
          if (userInfo != null) {
            console.log('user found in db from findUsers');
            console.log("user is")
            console.log(userInfo)
            res.status(200).send({
              auth: true,
              username: userInfo.username,
              password: userInfo.password,
              message: 'user found in db',
              reddit: getLoginStatus(userInfo.redditId),
              twitter: getLoginStatus(userInfo.twitterId),
              facebook: getLoginStatus(userInfo.facebookId),
            });
          } else {
            console.error('no user exists in db with that username');
            res.status(401).send('no user exists in db with that username');
          }
        });
      })(req, res, next);
    });

   


    // post on everythinh service
    app.post('/post', (req, res, next) => {
      multiPassport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
          console.log(err);
        }
        console.log('user:')
        console.log(user)
        
        if (info !== undefined) {
          console.log(info.message);
          res.status(401).send(info.message);
          next()
        }

        const reddit = () => { 
          return new Promise((resolve, _) => {
            redditPost.postOnReddit(
              user.redditToken,
              req.body.postTitle,
              req.body.postContent, 
              (result) => {
                console.log(result)
                res.status(200).send({
                  message: 'posted',
                });
              })
          })
        }

        const twitter = () => { 
          return new Promise((resolve, _) => {
            twitterPost.postOnTwitter(
              user.twitterToken,
              user.twitterTokenSecret,
              req.body.postContent, 
              () => {
                resolve({
                  message: 'posted on twitter',
                });
              })
          })
        }

        const facebook = () => { 
          return new Promise((resolve, _) => {
            facebookPost.postMessageOnPages(
              user.facebookPagesList,
              req.body.postContent, 
              () => {
                resolve({
                  message: 'posted on facebook',
                });
              })
          })
        }

        socialMedias = []
        if (req.body.canPostReddit == true)
          socialMedias.push(reddit())
        if (req.body.canPostTwitter == true)
          socialMedias.push(twitter())
        if (req.body.canPostFacebook == true)
          socialMedias.push(facebook())
        
        Promise
          .all(socialMedias)
          .then((socialMediasResponse) => {
            console.log(socialMediasResponse)
            res.status(200).send({
              message: 'posted',
            })
          })
          .catch(error => {
            console.log(error)
            res.send({
              message: 'an error occured, not posted'
            })
          })

      })(req, res, next);
    })


    // facebook service
    app.get('/login/facebook',
    multiPassport.authenticate('facebook', {
        scope: ["manage_pages", "public_profile", 
                "pages_show_list", "publish_pages"]
    }));

    //returning from facebook
    app.get('/return/facebook', 
    multiPassport.authenticate('facebook', { 
      failureRedirect: '/login' 
    }), (req, res) => {
        res.redirect('http://localhost:3000/userProfile')
    })

    
    //post on facebook
    app.post('/post/facebook', (req, res, next) => {
      multiPassport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
          console.log(err);
        }

        if (info !== undefined) {
          console.log(info.message);
          res.status(401).send(info.message);
          next()
        }
        
        facebookPost.postMessageOnPages(
          user.facebookPagesList,
          req.body.postContent, 
          (result) => {
            console.log(result)
            res.status(200).send({
              message: 'posted',
            });
          })

      })(req, res, next);
    });
        

    // twitter service
    app.get('/login/twitter',
      multiPassport.authenticate('twitter')
    );

    //return from twitter
    app.get('/return/twitter',
    multiPassport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('http://localhost:3000/userProfile')
    });

    //post on twitter
    app.post('/post/twitter', (req, res, next) => {
      multiPassport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
          console.log(err);
        }
        console.log('user:')
        console.log(user)
        // const userId = JSON.parse(Object.values(req.sessionStore.sessions)[0]).passport.user
        if (info !== undefined) {
          console.log(info.message);
          res.status(401).send(info.message);
          next()
        }
        
        twitterPost.postOnTwitter(
          user.twitterToken,
          user.twitterTokenSecret,
          req.body.postContent, 
          (result) => {
            console.log(result)
            res.status(200).send({
              message: 'posted',
            });
          })

      })(req, res, next);
    });

    // reddit service
    app.get('/login/reddit', function(req, res, next) {
        req.session.state = crypto.randomBytes(32).toString('hex')
        console.log("REQUEST SESSION")
        console.log(req.session)
        multiPassport.authenticate('reddit', {
            state: req.session.state,
            duration: 'permanent',
            scope: [
                'identity', 'edit', 'flair', 'history', 'modconfig', 
                'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 
                'privatemessages', 'read', 'report', 'save', 'submit', 
                'subscribe', 'vote', 'wikiedit', 'wikiread'
            ]
        })(req, res, next)
    })
  
    //return from reddit
    app.get('/return/reddit',
    multiPassport.authenticate('reddit', {
      failureRedirect: '/login'
    }), (req, res) => {
      res.redirect('http://localhost:3000/userProfile');
    })

    //post on reddit
    app.post('/post/reddit', 
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {     
      facebookPost.postMessageOnPages(
          req.user.facebookPagesList,
          req.body.postContent, (result) => {
              res.redirect('/profile')
          })
    })

    app.post('/post/reddit', 
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {     
      redditPost.postMessageOnPages(
          req.body.postTitle,
          req.body.postContent, 
          (result) => {
            console.log(result)
            res.status(200).send({
              message: 'posted',
            });
          })
    })
}
