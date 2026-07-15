import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 bg-neutral-900 text-neutral-100 px-4 py-2 rounded border border-neutral-700 focus:outline-none focus:border-amber-500"
      />
      <button type="submit" className="px-4 py-2 bg-amber-500 text-black rounded font-medium">
        Search
      </button>
    </form>
  );
}