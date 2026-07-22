// controllers/tmdb.controller.js
import axios from 'axios';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_KEY = process.env.TMDB_API_KEY;

export const getMovieFeatures = async (req, res) => {
  try {
    const { id } = req.params;
    const [detailsRes, keywordsRes] = await Promise.all([
      axios.get(`${TMDB_BASE}/movie/${id}`, { params: { api_key: TMDB_KEY } }),
      axios.get(`${TMDB_BASE}/movie/${id}/keywords`, { params: { api_key: TMDB_KEY } }),
    ]);

    res.json({
      genreIds: detailsRes.data.genres?.map((g) => g.id) || [],
      keywordIds: keywordsRes.data.keywords?.map((k) => k.id) || [],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch movie features.' });
  }
};

export const discoverByGenres = async (req, res) => {
  try {
    const { genres, exclude } = req.query; // genres="28,12,16", exclude="603,155"
    const excludeIds = exclude ? exclude.split(',').map(Number) : [];

    const { data } = await axios.get(`${TMDB_BASE}/discover/movie`, {
      params: {
        api_key: TMDB_KEY,
        with_genres: genres,
        sort_by: 'popularity.desc',
      },
    });

    const results = (data.results || []).filter((m) => !excludeIds.includes(m.id));
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to discover movies.' });
  }
};