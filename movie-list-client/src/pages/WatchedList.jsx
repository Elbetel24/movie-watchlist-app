import MovieList from "../components/MovieList";


function WatchedList() {
    return (
        <div>
           <h1>Watched List</h1> 
           <MovieList status="watched" />
              </div>
        
    );
}

export default WatchedList;