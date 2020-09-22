const crypto = require('crypto')

const User = require('./models/User')
const facebookPost = require('./facebookPost/postOnFacebook')

module.exports = function(app, multiPassport) {

    app.get('/',
    function(req, res) {
        res.render('home', { user: req.user });
    });

    app.get('/login',
    function(req, res){
        res.render('login');
    });
    
    app.post('/login', 
    multiPassport.authenticate('local-login', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

    app.post('/signup', multiPassport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        // console.log(req.user)
        User.findById({_id: req.user.id})
        .then(user => res.render('profile', { item: user, user: req.user }))
        .catch(err => res.status(404).json({ msg: 'No items found' }));
        // res.render('profile', { 
        // user: req.user,
        // facebook_user: req.facebook_user });
    });

    // facebook service
    app.get('/login/facebook',
    multiPassport.authenticate('facebook', {
        scope: ["manage_pages", "public_profile", 
                "pages_show_list", "publish_pages"]
    }));

    app.get('/return/facebook', 
    multiPassport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

    app.post('/post/facebook', 
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {     
        facebookPost.postMessageOnPages(
            req.user.facebookPagesList,
            req.body.postContent, (result) => {
                res.redirect('/profile')
            })
    })

    // reddit service
    app.get('/login/reddit', function(req, res, next){
        req.session.state = crypto.randomBytes(32).toString('hex');
        multiPassport.authenticate('reddit', {
            state: req.session.state,
            duration: 'permanent',
            scope: [
                'identity', 'edit', 'flair', 'history', 'modconfig', 
                'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 
                'privatemessages', 'read', 'report', 'save', 'submit', 
                'subscribe', 'vote', 'wikiedit', 'wikiread'
            ]
        })(req, res, next);
    });
  
    app.get('/return/reddit', function(req, res, next){
        multiPassport.authenticate('reddit', {
            successRedirect: '/',
            failureRedirect: '/login'
        })(req, res, next);
    });

    app.post('/post/reddit', 
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {     
        facebookPost.postMessageOnPages(
            req.user.facebookPagesList,
            req.body.postContent, (result) => {
                res.redirect('/profile')
            })
    })

}