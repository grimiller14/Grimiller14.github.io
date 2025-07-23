import { useState, useRef, useEffect } from "react";
import extraKinks from "../data/extra-kinks";
import basicKinks from "../data/basic-kinks";
import positions from "../data/positions";

const Generator = () => {
    const [selectedContent, setSelectedContent] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });
    const [history, setHistory] = useState(() => {
        const stored = localStorage.getItem("history");
        return stored ? JSON.parse(stored) : [];
    });
    const [currentImage, setCurrentImage] = useState(null);
    const [nextImage, setNextImage] = useState(null);

    const lastExtraIndex = useRef(null);
    const lastBasicIndex = useRef(null);
    const lastPositionIndex = useRef(null);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem("history", JSON.stringify(history));
    }, [history]);

    // Preload the first image
    useEffect(() => {
        if (!nextImage && positions.length > 0) {
            const first = pickRandom(positions, lastPositionIndex);
            setNextImage(first);
            const preload = new Image();
            preload.src = first;
        }
    }, [nextImage]);

    const pickRandom = (arr, lastRef) => {
        if (!arr || arr.length === 0) return "";
        if (arr.length === 1) {
            lastRef.current = 0;
            return arr[0];
        }

        let index;
        do {
            index = Math.floor(Math.random() * arr.length);
        } while (index === lastRef.current);

        lastRef.current = index;
        return arr[index];
    };

    const vibrate = (ms = 10) => {
        if (navigator?.vibrate) navigator.vibrate(ms);
    };

    const pushToHistory = (item, isImg = false) => {
        const capped = [...history, { content: item, isImage: isImg }].slice(-100);
        setHistory(capped);
    };

    const handlePickBasic = () => {
        const item = pickRandom(basicKinks, lastBasicIndex);
        setSelectedContent(item);
        setIsImage(false);
        setImageLoading(false);
        pushToHistory(item, false);
        vibrate();
    };

    const handlePickExtra = () => {
        const item = pickRandom(extraKinks, lastExtraIndex);
        setSelectedContent(item);
        setIsImage(false);
        setImageLoading(false);
        pushToHistory(item, false);
        vibrate();
    };

    const handlePickImage = () => {
        if (!nextImage) return;

        setImageLoading(true);
        setSelectedContent(nextImage);
        setCurrentImage(nextImage);
        setIsImage(true);
        pushToHistory(nextImage, true);
        vibrate();

        const upcoming = pickRandom(positions, lastPositionIndex);
        setNextImage(upcoming);
        const preload = new Image();
        preload.src = upcoming;
    };

    const toggleFavorite = () => {
        if (!selectedContent) return;
        setFavorites(prev =>
            prev.includes(selectedContent)
                ? prev.filter(f => f !== selectedContent)
                : [...prev, selectedContent]
        );
    };

    const isCurrentFavorite = selectedContent && favorites.includes(selectedContent);

    return (
        <>
            <div className="display-area">
                {selectedContent ? (
                    <div className="content-wrapper">
                        <button
                            className={`favorite-icon ${isCurrentFavorite ? "favorited" : ""}`}
                            onClick={toggleFavorite}
                            aria-label="Toggle Favorite"
                        >
                            {isCurrentFavorite ? "★" : "☆"}
                        </button>

                        {isImage ? (
                            <>
                                {imageLoading && (
                                    <div className="loading-spinner">Loading...</div>
                                )}
                                <img
                                    src={selectedContent}
                                    alt="Position"
                                    className="position-image"
                                    onLoad={() => setImageLoading(false)}
                                    onError={() => setImageLoading(false)}
                                />
                            </>
                        ) : (
                            <div className="placeholder-box">
                                {selectedContent}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="display-text">
                        Tap a button to start
                    </div>
                )}
            </div>

            <div className="button-bar-fixed">
                <div className="main-buttons">
                    <button className="pick-button" onClick={handlePickBasic}>Roll Basic</button>
                    <button className="pick-button" onClick={handlePickExtra}>Roll Extra</button>
                    <button className="pick-button" onClick={handlePickImage}>Roll Position</button>
                </div>
            </div>
        </>
    );
};

export default Generator;
