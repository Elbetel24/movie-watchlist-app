import { useState, useEffect } from 'react';
import watchlistService from '../services/watchlist.service.js';
import MovieCard from './MovieCard';

function MovieList({ status }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await watchlistService.getWatchlist(status);
                setItems(res);
            } catch (error) {
                setError(`Could not load ${status}`);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [status]);

    const handleRemove = async (movieId) => {
        try {
            await watchlistService.removeFromWatchlist(movieId);
            setItems((prev) => prev.filter((item) => item.movieId !== movieId));
        } catch (err) {
            console.error(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.length === 0 ? (
                <p>{status === 'watched' ? "You haven't watched anything yet." : 'Your watchlist is empty.'}</p>
            ) : (
                items.map((item) => (
                    <MovieCard
                        key={item._id}
                        movie={{
                            id: item.movieId,
                            title: item.title,
                            poster_path: item.posterPath,
                        }}
                        onRemove={() => handleRemove(item.movieId)}
                        variant="list"
                    />
                ))
            )}
        </div>
    );
}

export default MovieList;