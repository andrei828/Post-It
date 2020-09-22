import React from 'react'
import Preview from './Preview'

export default function PreviewList({ previews, content, handleRemovePreview }) {
    return (
        previews.map(preview => {
            return <Preview id={preview.id} previewType={preview.previewType} content={content} handleRemovePreview={handleRemovePreview} />
        })
    )
}
