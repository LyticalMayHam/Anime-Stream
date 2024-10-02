// src/components/AnimeDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const AnimeDetail = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                const response = await axios.get(`https://kitsu.io/api/edge/anime/${id}`);
                if (response.data.data) {
                    const details = response.data.data.attributes;
                    setAnime({
                        title: details.canonicalTitle,
                        synopsis: details.synopsis,
                        imageUrl: details.posterImage.large,
                        genres: details.genres.map(genre => genre.attributes.name).join(', ')
                    });
                }
            } catch (err) {
                console.error('Error fetching details:', err);
                setError('Failed to fetch anime details.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="anime-detail">
            {anime && (
                <>
                    <h2>{anime.title}</h2>
                    <img src={anime.imageUrl} alt={anime.title} />
                    <p><strong>Genres:</strong> {anime.genres}</p>
                    <p>{anime.synopsis}</p>
                </>
            )}
        </div>
    );
};

export default AnimeDetail;