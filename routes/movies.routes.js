import { Router} from 'express';
import { getPopularMovies, searchMovies, getMovieById } from '../controller/movies.controller.js';

const moviesRouter=Router();


moviesRouter.get('/popular',getPopularMovies);
moviesRouter.get('/search',searchMovies);
moviesRouter.get('/:id', getMovieById);

export default moviesRouter;