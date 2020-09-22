import React from 'react'
import PreviewHeader from './PreviewHeader'
import PreviewContent from './PreviewContent'
import PreviewFooter from './PreviewFooter'

export default function Preview({ id, previewType, content, handleRemovePreview }) {
    return (
        <div class="preview">
            <PreviewHeader id={id} previewType={previewType} content={content} handleRemovePreview={handleRemovePreview} />
            <PreviewContent previewType={previewType} content={content} />
            <PreviewFooter previewType={previewType} content={content} />
        </div>
    )
}
