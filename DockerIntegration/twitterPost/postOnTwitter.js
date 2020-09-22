var Twitter = require('twitter');

//our Twitter app ID and Secret
const TWITTER_APP_ID = '[YOUR_OWN_ID]';
const TWITTER_APP_SECRET = '[YOUR_OWN_SECRET]';

exports.postOnTwitter = async (token, tokenSecret, tweetContent, cb) => {

    //build the request object
    const client = new Twitter({
        consumer_key: TWITTER_APP_ID,
        consumer_secret: TWITTER_APP_SECRET,
        access_token_key: token,
        access_token_secret: tokenSecret
    });

    client.post('statuses/update', {status: tweetContent},  function(error, tweet, response) {
        if (error) console.log(error)
        // remove the object
        delete this
        
        //handle the response
        cb(response)
    }).catch(error => cb(error));
      
}
