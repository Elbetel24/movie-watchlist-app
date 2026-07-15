import api from './api';

export const getPopularMovies = (page =1 ) => 
    api.get('/movies/popular' , {params : {page }}).then(  res => res.data);


export const searchMovies= (query, page= 1) =>
    api.get('/movies/search',{ params : {query, page }}).then( res => res.data);




