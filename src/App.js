import React, { useState, useRef, useEffect } from "react";
import extraKinks from "./data/extra-kinks";
import basicKinks from "./data/basic-kinks";
import positions from "./data/positions";

const App = () => {
    const [selectedContent, setSelectedContent] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const [currentImage, setCurrentImage] = useState(null);
    const [nextImage, setNextImage] = useState(null);

    const [favorites, setFavorites] = useState([]); // placeholder

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

    useEffect(() => {
        if (!nextImage && positions.length > 0) {
            const first = pickRandomItem(positions, lastPositionIndexRef);
            setNextImage(first);
            const preload = new Image();
            preload.src = first;
        }
    }, [nextImage, positions]);

    const pushToHistory = () => {
        if (selectedContent !== null) {
            setHistory(prev => {
                const updated = [...prev, { content: selectedContent, isImage }];
                return updated.slice(-10);
            });
            setRedoStack([]); // Clear redo on new action
        }
    };

    const handlePickBasic = () => {
        pushToHistory();
        const item = pickRandomItem(basicKinks, lastBasicIndexRef);
        setSelectedContent(item);
        setIsImage(false);
        setImageLoading(false);
        vibrate();
    };

    const handlePickExtra = () => {
        pushToHistory();
        const item = pickRandomItem(extraKinks, lastExtraIndexRef);
        setSelectedContent(item);
        setIsImage(false);
        setImageLoading(false);
        vibrate();
    };

    const handlePickImage = () => {
        if (!nextImage) return;

        pushToHistory();
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
        setHistory(prev => {
            if (prev.length === 0) return prev;

            const last = prev[prev.length - 1];
            setRedoStack(r => [...r, { content: selectedContent, isImage }]);
            setSelectedContent(last.content);
            setIsImage(last.isImage);
            setImageLoading(false);

            return prev.slice(0, -1);
        });
    };

    const handleRedo = () => {
        setRedoStack(prev => {
            if (prev.length === 0) return prev;

            const last = prev[prev.length - 1];
            setHistory(h => [...h, { content: selectedContent, isImage }]);
            setSelectedContent(last.content);
            setIsImage(last.isImage);
            setImageLoading(false);

            return prev.slice(0, -1);
        });
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
    <div className="main-buttons">
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
    </div>

    <div className="undo-redo-bar">
        <button
            className="small-button"
            onClick={handleUndo}
            disabled={history.length === 0}
        >
            Undo
        </button>
        <button
            className="small-button"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
        >
            Redo
        </button>
    </div>
</div>
        </div>
    );
};

export default App;