// src/services/tmdb.service.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : '/api/v1';

export async function getMovieFeatures(movieId) {
  const res = await axios.get(`${API_BASE}/tmdb/movie/${movieId}/features`);
  return res.data; // { genreIds, keywordIds }
}

export async function discoverByGenres(genreIds, excludeIds = []) {
  const res = await axios.get(`${API_BASE}/tmdb/discover`, {
    params: {
      genres: genreIds.slice(0, 3).join(','),
      exclude: excludeIds.join(','),
    },
  });
  return res.data;
}