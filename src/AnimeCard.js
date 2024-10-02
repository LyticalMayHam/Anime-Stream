// src/components/AnimeCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
    return (
        <div className="anime-card">
            <Link to={`/anime/${anime.id}`}>
                <div className="anime-image">
                    <img src={anime.imageUrl} alt={anime.title} />
                </div>
                <div className="anime-details">
                    <h3>{anime.title}</h3>
                    <p>{anime.synopsis}</p>
                </div>
            </Link>
        </div>
    );
};

export default AnimeCard;