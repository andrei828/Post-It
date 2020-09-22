import React from 'react'

function getHeader(previewType, content) {
    if (previewType === 'facebook')
        return <>
            <div>
                <img class="facebookProfileImage" src="/images/facebook.jpeg" />
            </div>
            <div>
                <div>
                    {content.name}
                </div>
                <div>
                    Just now
                </div>
            </div>
        </>
    if (previewType === 'twitter')
        return <>
            <div>
                <img class="facebookProfileImage" src="/images/twitter.png" />
            </div>
            <div>
                <div>
                    {content.name}
                </div>
                <div>
                    @{content.userName}
                </div>
            </div>
        </>
    return <>previewType not found: {previewType}</>
}

export default function PreviewHeader({ id, previewType, content, handleRemovePreview }) {
    function remove() {
        handleRemovePreview(id);
    }
    return (
        <div class="previewHeader">
            {getHeader(previewType, content)}
            <div>
                <button onClick={remove}>X</button>
            </div>
        </div>
    )
}
