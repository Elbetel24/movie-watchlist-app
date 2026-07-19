import { addToList } from '../services/watchlist.service';
import { useState } from 'react';
const IMG_BASE = 'https://image.tmdb.org/t/p/w342';

export default function MovieCard({ movie }) {

  const  [ status , setStatus ]= useState(null);
  const [  loading, setLoading ]= useState(false);

  const handleAdd = async (status) => {
    setLoading(true);
    try {
      await addToList(movie, status);
      setStatus(status);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg flex flex-col">
      <img
        src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : '/placeholder-poster.png'}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-neutral-100 font-semibold text-sm truncate">{movie.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleAdd('watchlist')}
            disabled={loading}
            className={`flex-1 text-xs py-1 rounded transition ${
              status === 'watchlist'
                ? 'bg-amber-300 text-black'
                : 'bg-amber-500 text-black hover:bg-amber-400'
            } disabled:opacity-50`}
          >
            {status === 'watchlist' ? '✓ In Watchlist' : '+ Watchlist'}
          </button>
                    <button
            onClick={() => handleAdd('watched')}
            disabled={loading}
            className={`flex-1 text-xs py-1 rounded border transition ${
              status === 'watched'
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'border-amber-500 text-amber-500 hover:bg-amber-500/10'
            } disabled:opacity-50`}
          >
            {status === 'watched' ? '✓ Watched' : 'Watched'}
          </button>

        </div>
      </div>
    </div>
  );
}