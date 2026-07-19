import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';

const client = axios.create({
  baseURL: API_BASE || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getWatchlist = async (status) => {
  const res = await client.get('/watchlist', { params: status ? { status } : {} });
  return res.data;
};

const addToList = async (movie, status) => {
  const res = await client.post('/watchlist', {
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    status,
  });
  return res.data;
};

const removeFromWatchlist = async (movieId) => {
  const res = await client.delete(`/watchlist/${movieId}`);
  return res.data;
};

export default {
  getWatchlist,
  addToList,
  removeFromWatchlist,
};