import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useNavigate } from "react-router-dom"


function MovieCard({ movie }) {

    const { addToFavorites, removeFavorites, isFavorite } = useMovieContext()
    const favorite = isFavorite(movie.id)
    const navigate = useNavigate()

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) {
            removeFavorites(movie.id)
        } else {
            addToFavorites(movie)
        }
    }

    function onTrailerClick() {
        navigate(`/trailer/${movie.id}`)
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overaly">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
                <button className="trailer-btn" onClick={onTrailerClick}>
                    🎥
                </button>
            </div>
        </div>
    );
}

export default MovieCard