import React from 'react'

function getFooter(previewType, content) {
    if (previewType === 'facebook')
        return <span class="facebookFooter">
            <span>
                <img class="reaction" src="/images/like.png" />
                {content.reactions.likes}
            </span>

            <span class="rightAlign">
                {content.reactions.comments} comments
            </span>
        </span>
    if (previewType === 'twitter')
        return <span >
            {content.reactions.retweets} Retweets {content.reactions.likes} Likes
        </span>
    return <>previewType not found: {previewType}</>
}

export default function PreviewFooter({ previewType, content }) {
    return (
        <div class="previewFooter">
            {getFooter(previewType, content)}
        </div>
    )
}
