// services/watchlist.service.js
import axios from 'axios';

export const addToList = async (movie, status) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    '/api/watchlist',
    {
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      status
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};