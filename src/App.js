import React, { useState, useRef } from "react";
import extraKinks from "./data/extra-kinks";
import basicKinks from "./data/basic-kinks";
import "./App.css";

const App = () => {
    const [selectedItem, setSelectedItem] = useState('');

    const lastExtraIndexRef = useRef(null);
    const lastBasicIndexRef = useRef(null);

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
        setSelectedItem(item);
    };

    const handlePickExtra = () => {
        const item = pickRandomItem(extraKinks, lastExtraIndexRef);
        setSelectedItem(item);
    };

    return (
        <div className="app-container">
            <div className="display-area">
                {selectedItem || "Click a button to start"}
            </div>
            <div className="button-bar">
                <button className="pick-button" onClick={handlePickBasic}>
                    Roll Basic
                </button>
                <button className="pick-button" onClick={handlePickExtra}>
                    Roll Extra
                </button>
            </div>
        </div>
    );
};

export default App;
