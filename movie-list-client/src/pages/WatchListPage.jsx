import MovieList from "../components/MovieList";

function WatchListPage() {
    return (
        <div>
            <h1>My Watchlist</h1>
            <MovieList status="watchlist"/>
        </div>
    );
}

export default WatchListPage;

