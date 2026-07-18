import { useState, useeffect} from 'react';
import axios from 'axios';

function MovieList({status}) {


    const [ items, setItems ]= useState([]);
    const [ loading, setLoading]= useState(true);
    const [ error, setError ]=useState(null);

    useEffect(() => {
        const fetchItems= async () => {
        setLoading(true);
        setError(null);
        try {
            const token= localStorage.getItemI('token');
            const res= await  axios.get('api/v1/watchlist', {
                params : { status },
                headers :{ Authorization: `Bearer ${token}`}
         });
         setItems(res.data);
        } catch(err){
            setError(`Could not load ${status}`);
        } finally {
            setLoading(false);
       }   
    };
    fetchItems();
}, [status]);


 if (loading ) return <p> Loading ...</p>
 if (error ) return <p>{error}</p>



  return (
    <div className="grid">
      {items.length === 0 ? (
        <p>{status === 'watched' ? "You haven't watched anything yet." : 'Your watchlist is empty.'}</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="movie-card">
            <img
              src={
                item.posterPath
                  ? `https://image.tmdb.org/t/p/w300${item.posterPath}`
                  : '/placeholder-poster.png'
              }
              alt={item.title}
            />
            <p>{item.title}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MovieList;

