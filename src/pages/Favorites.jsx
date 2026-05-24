import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"

function Favorites() {
    const { favorites } = useMovieContext()

    if (favorites) {
        return (
            <div className="favorites">
                <h1>Favorites</h1>
            
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="favorites-empty">
            <h1>Favorites</h1>
            <h2>No favorite movies yet.</h2>
            <p>Start adding movies to your favorites list!</p>
        </div>
    )
}

export default Favorites