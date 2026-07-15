import api from './api';

export const addToList = (movie, status) =>
  api.post('/watchlist', {
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    status
  }).then(res => res.data);

export const removeFromList = (movieId) =>
  api.delete(`/watchlist/${movieId}`);

export const getMyList = (status) =>
  api.get('/watchlist', { params: status ? { status } : {} }).then(res => res.data);