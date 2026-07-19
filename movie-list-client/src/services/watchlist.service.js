import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';

const client = axios.create({
  baseURL: API_BASE || '/api',
  headers: { 'Content-Type': 'application/json' },
});

const getWatchlist = async () => {
  const res = await client.get('/v1/watchlist');
  return res.data;
};

const addToWatchlist = async (movie) => {
  const res = await client.post('/v1/watchlist', movie);
  return res.data;
};

const removeFromWatchlist = async (id) => {
  const res = await client.delete(`/v1/watchlist/${id}`);
  return res.data;
};

const updateWatchlist = async (id, patch) => {
  const res = await client.put(`/v1/watchlist/${id}`, patch);
  return res.data;
};

export default {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlist,
};