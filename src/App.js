import React, { useState, useRef, useEffect } from "react";
import extraKinks from "./data/extra-kinks";
import basicKinks from "./data/basic-kinks";
import positions from "./data/positions";

const App = () => {
    const [selectedContent, setSelectedContent] = useState(null); // string or image URL
    const [isImage, setIsImage] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [prevContent, setPrevContent] = useState(null); // for undo
    const [prevIsImage, setPrevIsImage] = useState(false);

    const [currentImage, setCurrentImage] = useState(null);
    const [nextImage, setNextImage] = useState(null);

    // Placeholder for future favorites logic
    const [favorites, setFavorites] = useState([]);

    const lastExtraIndexRef = useRef(null);
    const lastBasicIndexRef = useRef(null);
    const lastPositionIndexRef = useRef(null);

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

    // Initialize first nextImage
    useEffect(() => {
        if (!nextImage && positions.length > 0) {
            const first = pickRandomItem(positions, lastPositionIndexRef);
            setNextImage(first);
            const preload = new Image();
            preload.src = first;
        }
    }, [nextImage, positions]);

    const handlePickBasic = () => {
        const item = pickRandomItem(basicKinks, lastBasicIndexRef);
        setPrevContent(selectedContent);
        setPrevIsImage(isImage);

        setSelectedContent(item);
        setIsImage(false);
        setImageLoading(false);
        vibrate();
    };

    const handlePickExtra = () => {
        const item = pickRandomItem(extraKinks, lastExtraIndexRef);
        setPrevContent(selectedContent);
        setPrevIsImage(isImage);

        setSelectedContent(item);
        setIsImage(false);
        setImageLoading(false);
        vibrate();
    };

    const handlePickImage = () => {
        if (!nextImage) return;

        setPrevContent(currentImage);
        setPrevIsImage(true);

        setImageLoading(true);
        setSelectedContent(nextImage);
        setCurrentImage(nextImage);
        setIsImage(true);
        vibrate();

        const upcoming = pickRandomItem(positions, lastPositionIndexRef);
        setNextImage(upcoming);

        const preload = new Image();
        preload.src = upcoming;
    };

    const handleUndo = () => {
        if (prevContent !== null) {
            setSelectedContent(prevContent);
            setIsImage(prevIsImage);
            setImageLoading(false);
        }
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
                <button className="pick-button" onClick={handlePickBasic}>
                    Roll Basic
                </button>
                <button className="pick-button" onClick={handlePickExtra}>
                    Roll Extra
                </button>
                <button
                    className="pick-button"
                    onClick={handlePickImage}
                    disabled={positions.length === 0}
                >
                    Roll Position
                </button>
                <button
                    className="pick-button"
                    onClick={handleUndo}
                    disabled={!prevContent}
                >
                    Undo
                </button>
            </div>
        </div>
    );
};

export default App;