// src/components/Recommendations.jsx
import { useRecommendations } from '../hooks/useRecommendation.js';
import MovieCard from './MovieCard';

export default function Recommendations() {
  const { recommendations, loading, error } = useRecommendations();

  if (loading) return <p>Finding movies you might like...</p>;
  if (error) return <p>{error}</p>;
  if (recommendations.length === 0) {
    return <p>Add a few movies to your watchlist to get recommendations.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {recommendations.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}