import { addToList } from '../services/watchlist.service';

const IMG_BASE = 'https://image.tmdb.org/t/p/w342';

export default function MovieCard({ movie }) {
  const handleAdd = async (status) => {
    try {
      await addToList(movie, status);
    } catch (err) {
      console.error(err.message);
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
            className="flex-1 text-xs py-1 rounded bg-amber-500 text-black hover:bg-amber-400"
          >
            + Watchlist
          </button>
          <button
            onClick={() => handleAdd('watched')}
            className="flex-1 text-xs py-1 rounded border border-amber-500 text-amber-500 hover:bg-amber-500/10"
          >
            Watched
          </button>
        </div>
      </div>
    </div>
  );
}