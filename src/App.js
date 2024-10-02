// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimeList from './AnimeList';
import AnimeDetail from './AnimeDetail';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Anime Streaming Platform</h1>
                <Routes>
                    <Route path="/" element={<AnimeList />} />
                    <Route path="/anime/:id" element={<AnimeDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;