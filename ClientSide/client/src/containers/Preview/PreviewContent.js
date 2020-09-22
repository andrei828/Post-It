import React from 'react'

export default function PreviewContent({ previewType, content }) {
    return (
        <div class="previewContent">
            {content.text}
        </div>
    )
}
