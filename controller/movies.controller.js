import tmdbAPI from "../services/tmdb.service.js";
export const getPopularMovies = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await tmdbAPI.get('/movie/popular', { params: { page } });
        return res.json(response.data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to fetch popular movies' });
    }
};

export const searchMovies = async (req, res) => {
    try {
        const { query, page = 1 } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter "query" is required.' });
        }
        const response = await tmdbAPI.get('/search/movie', { params: { query, page } });
        return res.json(response.data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to search movies.' });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await tmdbAPI.get(`/movie/${id}`);
        return res.json(response.data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to fetch movie details.' });
    }
};

