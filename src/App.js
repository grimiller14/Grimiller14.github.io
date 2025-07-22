import React, { useState, useEffect, useRef } from "react";
import extraKinks from "./data/extra-kinks";
import basicKinks from "./data/basic-kinks";

const App = () => {
    const [selectedExtra, setSelectedExtra] = useState('');
    const [selectedBasic, setSelectedBasic] = useState('');

    const lastExtraIndexRef = useRef(null);
    const lastBasicIndexRef = useRef(null);

    const pickRandomItem = (items, lastIndexRef, setSelected) => {
        if (items.length < 2) {
            setSelected(items[0] || '');
            return;
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * items.length);
        } while (randomIndex === lastIndexRef.current);

        lastIndexRef.current = randomIndex;
        setSelected(items[randomIndex]);
    };

    const handleExtraPick = () => {
        pickRandomItem(extraKinks, lastExtraIndexRef, setSelectedExtra);
    };

    const handleBasicPick = () => {
        pickRandomItem(basicKinks, lastBasicIndexRef, setSelectedBasic);
    };

    useEffect(() => {
        handleExtraPick();
        handleBasicPick();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div>
                <div>{selectedBasic}</div>
                <button type="button" onClick={handleBasicPick}>roll basic</button>
            </div>
            <div>
                <div>{selectedExtra}</div>
                <button type="button" onClick={handleExtraPick}>roll extra</button>
            </div>
        </div>
    );
};

export default App;
