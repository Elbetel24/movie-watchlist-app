import express from 'express';
import { getMovieFeatures, discoverByGenres } from '../controller/tmdb.controller.js';

const tmdbRouter=express.Router();

tmdbRouter.get('/movie/:id/features', getMovieFeatures);
tmdbRouter.get('/discover', discoverByGenres);

export default tmdbRouter;