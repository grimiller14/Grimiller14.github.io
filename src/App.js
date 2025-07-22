import React, { useState, useRef } from "react";
import extraKinks from "./data/extra-kinks";
import basicKinks from "./data/basic-kinks";
import positions from "./data/positions";

const App = () => {
    const [selectedContent, setSelectedContent] = useState(null); // Could be string or image URL
    const [isImage, setIsImage] = useState(false);

    const lastExtraIndexRef = useRef(null);
    const lastBasicIndexRef = useRef(null);
    const lastPositionIndexRef = useRef(null);

    const pickRandomItem = (items, lastIndexRef) => {
        if (items.length === 0) return '';
        if (items.length === 1) return items[0];

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * items.length);
        } while (randomIndex === lastIndexRef.current);

        lastIndexRef.current = randomIndex;
        return items[randomIndex];
    };

    const handlePickBasic = () => {
        const item = pickRandomItem(basicKinks, lastBasicIndexRef);
        setSelectedContent(item);
        setIsImage(false);
    };

    const handlePickExtra = () => {
        const item = pickRandomItem(extraKinks, lastExtraIndexRef);
        setSelectedContent(item);
        setIsImage(false);
    };

    const handlePickImage = () => {
        const image = pickRandomItem(positions, lastPositionIndexRef);
        setSelectedContent(image);
        setIsImage(true);
    };

    return (
        <div className="app-container">
            <div className="display-area">
                {isImage ? (
                    <img src={selectedContent} alt="Position" className="position-image" />
                ) : (
                    <div>{selectedContent || "Click a button to start"}</div>
                )}
            </div>
            <div className="button-bar">
                <button className="pick-button" onClick={handlePickBasic}>Roll Basic</button>
                <button className="pick-button" onClick={handlePickExtra}>Roll Extra</button>
                <button className="pick-button" onClick={handlePickImage}>Roll Position</button>
            </div>
        </div>
    );
};

export default App;