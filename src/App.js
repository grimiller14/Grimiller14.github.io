import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Generator from "./pages/Generator";
import Favorites from "./pages/Favorites";
import History from "./pages/History";

const App = () => {
    return (
        <Router>
            <header style={{ textAlign: "center", padding: "1rem", background: "#eee" }}>
                <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
                <Link to="/favorites" style={{ marginRight: "1rem" }}>Favorites</Link>
                <Link to="/history">History</Link>
            </header>
            <Routes>
                <Route path="/" element={<Generator />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </Router>
    );
};

export default App;
