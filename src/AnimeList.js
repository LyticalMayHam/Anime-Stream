// src/components/AnimeList.js
import React, { useState } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import SearchBar from './SearchBar';

const AnimeList = () => {
    const [searchInput, setSearchInput] = useState('');
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(searchInput)}`);
            if (response.data.data.length > 0) {
                const results = response.data.data.map(anime => ({
                    title: anime.attributes.canonicalTitle,
                    synopsis: anime.attributes.synopsis || "No synopsis available.",
                    imageUrl: anime.attributes.posterImage.small || "https://via.placeholder.com/100",
                    id: anime.id,
                }));
                setAnimeList(results);
            } else {
                setError('No results found.');
                setAnimeList([]);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('An error occurred while fetching anime details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} handleSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {animeList.length > 0 ? (
                animeList.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))
            ) : (
                !loading && <p>No anime found. Please try a different search.</p>
            )}
        </div>
    );
};

export default AnimeList;