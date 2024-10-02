// src/AnimeDetail.js
import React from 'react';

const AnimeDetail = ({ anime }) => {
    return (
        <div className="anime-detail">
            <h2>{anime.title}</h2>
            <img src={anime.imageUrl} alt={anime.title} />
            <p>{anime.synopsis}</p>
            {/* Add more details here */}
        </div>
    );
};

export default AnimeDetail;