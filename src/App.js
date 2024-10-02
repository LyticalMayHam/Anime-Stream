import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Importing Routes instead of Switch
import './App.css';

function App() {
    const [searchInput, setSearchInput] = useState('');
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Using Kitsu API to search for anime
            const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(searchInput)}`);
            
            // Log the raw response for debugging
            console.log('API Response:', response.data);
            
            if (response.data.data.length > 0) {
                const results = response.data.data.map(anime => ({
                    title: anime.attributes.canonicalTitle,
                    synopsis: anime.attributes.synopsis || "No synopsis available.",
                    imageUrl: anime.attributes.posterImage.small || "https://via.placeholder.com/100",
                    id: anime.id // Store the id for further requests if needed
                }));
                setAnimeList(results);
            } else {
                setError('No results found.');
                setAnimeList([]);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            // Provide more detailed error messages
            if (err.response) {
                // The request was made and the server responded with a status code
                setError(`Error: ${err.response.status} - ${err.response.data.errors[0].detail}`);
            } else if (err.request) {
                // The request was made but no response was received
                setError('Network error: No response received from server.');
            } else {
                // Something happened in setting up the request
                setError(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Welcome to Anime Stream</h1>
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            value={searchInput} 
                            onChange={(e) => setSearchInput(e.target.value)} 
                            placeholder="Search for an anime..." 
                            required 
                        />
                        <button type="submit">Search</button>
                    </form>
                </header>
                <main>
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    <Routes>
                        {/* Default route for displaying search results */}
                        <Route path="/" element={
                            animeList.length > 0 ? (
                                animeList.map((anime) => (
                                    <div className="anime-card" key={anime.id}>
                                        <div className="anime-image">
                                            <img src={anime.imageUrl} alt={anime.title} />
                                        </div>
                                        <div className="anime-details">
                                            <h3>{anime.title}</h3>
                                            <p>{anime.synopsis}</p>
                                            {/* Link to detailed view */}
                                            {/* Uncomment this if you want to implement detailed view */}
                                            {/* <Link to={`/anime/${anime.id}`}>View Details</Link> */}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                !loading && <p>No anime found. Please try a different search.</p>
                            )
                        } />
                    </Routes>
                </main>
                <footer>
                    <p>&copy; 2024 Anime Stream. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;