import axios from 'axios';
import { TMDB_READ_ACCESS_TOKEN } from '../config/env.js';
const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
    accept: 'application/json'
  }
});

export default tmdbAPI;