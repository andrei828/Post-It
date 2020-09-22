const request = require('request')
/*
KIND - type of post
subreddit - the subreddit we post in TODO: allow the user to change it
PostURL - the reddit API url
*/
const KIND = 'self'
const subreddit = 'test'
const PostURL = 'https://oauth.reddit.com/api/submit'


exports.postOnReddit = (accessToken, title, message, cb) => {
    
    //build the header
    headers = {
        'User-Agent': 'text/plain',
        'Authorization': `bearer ${accessToken}`
    }
    
    //build the body
    body = `kind=${KIND}&sr=${subreddit}&title=${title}&text=${message}`
    
    //build the request
    requestInfo = {
        headers: headers, 
        url: PostURL, 
        body: body
    }
    
    //send the request and handle the response
    request.post(requestInfo, function(error, response, body) {
        if (error) console.log(error)
        cb(message)
    });
}
