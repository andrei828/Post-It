const request = require('request')

//our Facebook app ID and Secret, used to post
const FACEBOOK_APP_ID = '[YOUR_OWN_ID]'
const FACEBOOK_APP_SECRET = '[YOUR_OWN_SECRET]'


postMessageOnPage = (pageId, pageAccessToken, message, cb) => {
    
    //build the post url
    postURL = `https://graph.facebook.com/` +
        `${pageId}/feed?` +
        `message=${message}&` +
        `access_token=${pageAccessToken}`

    //send the request and handle the response
    request.post(postURL, (error, res, body) => {
        try {
            console.log(body)
        } catch (e) {
            console.error("Failed to post on FACEBOOK")
            console.error(error)
        } finally {
            return cb(res)
        }
    })
}

//post on multiple pages
exports.postMessageOnPages = async (pageList, message, cb) => {

    let posts = pageList.map(page => {
        return new Promise(resolve => {
            if (page.canPost)
            postMessageOnPage(
                page.pageId, page.pageAccessToken, message, resolve
            )
        })
    })
    
    Promise
    .all(posts)
    .then(res => { return cb(res) })
    .catch(error => { return cb(null) })

}
  
exchangeForPageAccessToken = (pageId, userAccessToken, cb) => {
    pageAccessTokenURL = `https://graph.facebook.com/` +
        `${pageId}?access_token=${userAccessToken}&fields=access_token`

    request.get(pageAccessTokenURL, (error, res, body) => {
        try {
            return cb(JSON.parse(body).access_token)
        } catch {
            console.error("Failed to get PAGE ACCESS TOKEN")
            console.error(error)
            return cb(null)
        }
    })
}
  
exchangeForLongLivedAccessToken = (shortLivedUserAccessToken, cb) => {
    longLivedAccessTokenURL = `https://graph.facebook.com/oauth/` +
        `access_token?grant_type=fb_exchange_token&` +
        `client_id=${FACEBOOK_APP_ID}&` +
        `client_secret=${FACEBOOK_APP_SECRET}&` + 
        `fb_exchange_token=${shortLivedUserAccessToken}`
  
    request.get(longLivedAccessTokenURL, (error, res, body) => {
        try {
            return cb(JSON.parse(body).access_token)
        } catch {
            console.error("Failed to get LONG_LIVED USER ACCESS TOKEN")
            console.error(error)
            return cb(null)
        }
    })
}

exchangeUserTokenForPageToken = (pageId, userAccessToken, cb) => {
    exchangeForLongLivedAccessToken(userAccessToken, (longLivedAccessToken) => {
        // console.log(`Got llaccesstoken: ${longLivedAccessToken}`)
        if (longLivedAccessToken) {
            exchangeForPageAccessToken(pageId, longLivedAccessToken, (pageToken) => {
                // console.log(`got page access token: ${pageToken}`)
                return cb(pageToken)
            })
        }
    })
}

//get all pages of the user
exports.getAllPages = (facebookUserId, accessToken, cb) => {
    pagesUrl = `https://graph.facebook.com/` +
        `v6.0/${facebookUserId}/accounts?` +
        `type=page&access_token=${accessToken}`

    request.get(pagesUrl, (error, res, body) => {
            result = []
            // console.log(JSON.parse(res.body).data.length)
            for (pageInfo of JSON.parse(res.body).data)  {
                exchangeUserTokenForPageToken(pageInfo.id, accessToken, (pageToken) => {
                    result.push({
                        canPost: false, 
                        pageId: pageInfo.id,
                        name: pageInfo.name, 
                        pageAccessToken: pageToken
                    })
                    
                    if (result.length == JSON.parse(res.body).data.length) {
                        result[0].canPost = true
                        cb(result)
                    }
                })
            }
    })
}

exports.run = (pageId, message, accessToken) => {
    postMessageOnPage(pageId, pageAccessToken, message)
}

exports.reloadToken = (shortLivedUserAccessToken) => {
    exchangeForLongLivedAccessToken(shortLivedUserAccessToken)
}
