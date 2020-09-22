import React from 'react'

export default function PreviewCreator({ handleAddPreview }) {
    function createFacebookPreview() {
        handleAddPreview("facebook")
    }
    function createTwitterPreview() {
        handleAddPreview("twitter")
    }
    return (
        <div class="preview previewCreator">
            <button onClick={createFacebookPreview}>Add Facebook preview</button>
            <button onClick={createTwitterPreview}>Add Twitter preview</button>
        </div>
    )
}
