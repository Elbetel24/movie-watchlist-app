import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPopularMovies, searchMovies } from '../services/movie.service';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import './Auth.css'
export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('popular'); // 'popular' | 'search'

  useEffect(() => {
    if (mode !== 'popular') return;

    const fetchPopular = async () => {
      setLoading(true);
      try {
        const data = await getPopularMovies();
        setMovies(data.results || []);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, [mode]);

  const handleSearch = async (query) => {
    setLoading(true);
    setMode('search');
    try {
      const data = await searchMovies(query);
      setMovies(data.results || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-black px-6 py-8">
        <nav className="navbar">
            <div className="auth-sprockets top">
                    {Array.from({ length: 5 }).map((_, i) => <span key={i} />)}
                </div>
            <h1 className="dashboardtitle">
            <Link to="/WatchedList">Watched List  </Link>
            <Link to="/WatchListPage">Watch List  </Link>
            <br></br>
            {mode === 'popular' ? 'Popular Movies' : 'Search Results'}
      </h1>

        </nav>
      
      <SearchBar onSearch={handleSearch} />

      {mode === 'search' && (
        <button
          onClick={() => setMode('popular')}
          className="text-sm text-neutral-400 mb-4 underline"
        >
          ← Back to popular
        </button>
      )}

      {loading ? (
        <p className="text-neutral-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}