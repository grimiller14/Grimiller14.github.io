import React, { useState, useEffect } from "react";
import items from "./data/items";

const App = () => {

    const [selectedItem, setSelectedItem] = useState('');

    const handlePick = () => {
        const randomIndex = Math.floor(Math.random() * items.length);
        setSelectedItem(items[randomIndex]);
    };

    useEffect(() => {
        let loaded = false;
        if (!loaded) {
            loaded = true;
            handlePick();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <button type={'button'} onClick={handlePick}>roll</button>
            <div>{selectedItem}</div>
        </div>
    );
};

export default App;
