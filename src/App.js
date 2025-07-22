import React, { useState, useRef } from "react";
import extraKinks from "./data/extra-kinks";
import basicKinks from "./data/basic-kinks";
import positions from "./data/positions";

const App = () => {
    const [selectedContent, setSelectedContent] = useState(null); // string or image URL
    const [isImage, setIsImage] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const lastExtraIndexRef = useRef(null);
    const lastBasicIndexRef = useRef(null);
    const lastPositionIndexRef = useRef(null);

    // small helper to trigger haptics on supported devices
    const vibrate = (ms = 10) => {
        if (navigator?.vibrate) {
            navigator.vibrate(ms);
        }
    };

    const pickRandomItem = (items, lastIndexRef) => {
        if (!items || items.length === 0) return "";
        if (items.length === 1) {
            lastIndexRef.current = 0;
            return items[0];
        }

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
        setImageLoading(false);
        vibrate();
    };

    const handlePickExtra = () => {
        const item = pickRandomItem(extraKinks, lastExtraIndexRef);
        setSelectedContent(item);
        setIsImage(false);
        setImageLoading(false);
        vibrate();
    };

    const handlePickImage = () => {
        const image = pickRandomItem(positions, lastPositionIndexRef);
        setImageLoading(true);
        setSelectedContent(image);
        setIsImage(true);
        vibrate();
    };

    return (
        <div className="app-container">
            <div className="display-area">
                {isImage ? (
                    <>
                        {imageLoading && (
                            <div className="loading-spinner" role="status" aria-live="polite">
                                Loading...
                            </div>
                        )}
                        {selectedContent && (
                            <img
                                src={selectedContent}
                                alt="Position"
                                className="position-image"
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                            />
                        )}
                    </>
                ) : (
                    <div className="display-text">
                        {selectedContent || "Tap a button to start"}
                    </div>
                )}
            </div>

            <div className="button-bar">
                <button
                    className="pick-button"
                    type="button"
                    onClick={handlePickBasic}
                >
                    Roll Basic
                </button>
                <button
                    className="pick-button"
                    type="button"
                    onClick={handlePickExtra}
                >
                    Roll Extra
                </button>
                <button
                    className="pick-button"
                    type="button"
                    onClick={handlePickImage}
                    disabled={positions.length === 0}
                >
                    Roll Position
                </button>
            </div>
        </div>
    );
};

export default App;