// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchInput, setSearchInput, handleSearch }) => {
    return (
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
    );
};

export default SearchBar;