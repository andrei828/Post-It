import React, { useState, useRef } from "react";
import "./index.css"
import PreviewList from "./Preview/PreviewList";
import PreviewCreator from "./Preview/PreviewCreator";
import uuidv4 from 'uuid/v4';

const CONTENT = {
    name: "Billy Joe",
    userName: "billyjoeofficial",
    reactions: {
        likes: 7,
        comments: 8,
        retweets: 15
    },
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada egestas magna in scelerisque. Integer pellentesque eget nisl eget consectetur. Fusce at eros metus. Suspendisse tincidunt risus id massa mollis, non vulputate neque fringilla. Duis pharetra bibendum porttitor. Vivamus dolor est, suscipit sodales metus vulputate, imperdiet ultricies arcu. Nulla eleifend nisi sit amet neque aliquam, ut dictum nulla suscipit. Aenean facilisis elit sit amet volutpat interdum. Donec eu nisi vitae nunc fringilla tempus ut ut lectus. "
}

function SamplePreview() {
    const [previews, setPreviews] = useState([]);

    function handleAddPreview(previewType) {
        setPreviews(oldPreviews => {
            return [...oldPreviews, { id: uuidv4(), previewType: previewType }]
        });
    }

    function handleRemovePreview(UID) {
        const newPreviews = previews.filter(preview => preview.id != UID)
        setPreviews(newPreviews)
    }

    return (
        <div>
            <div class="previewList">
                <PreviewList previews={previews} content={CONTENT} handleRemovePreview={handleRemovePreview} />
                <PreviewCreator handleAddPreview={handleAddPreview} />
            </div>
        </div>
    );
}

export default SamplePreview;
//npm start
