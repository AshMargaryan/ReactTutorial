import MovieCard from "../components/MovieCard"
import {useState} from "react"

function Home() {
    const [searchQuery, setSearchQuery] = useState("")

    const movies = [
        {id:1, title: "Shawshank Redemption", release_date: "1994", url: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg"},
        {id:2, title: "The Godfather", release_date: "1972", url: "https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg"},
        {id:3, title: "The Dark Knight", release_date: "2008", url: "https://m.media-amazon.com/images/I/51EbJjlLJGL._AC_.jpg"},
        {id:4, title: "Pulp Fiction", release_date: "1994", url: "https://m.media-amazon.com/images/I/51V5ZpFyaFL._AC_.jpg"},
        {id:5, title: "The Lord of the Rings: The Return of the King", release_date: "2003", url: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg"},
    ]

    const handleSearch = (e) => {
        e.preventDefault()
        alert(searchQuery)
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for a movie..." 
                    className="search-input" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="movies-grid">
                {movies.map(
                    (movie) => 
                        movie.title.toLowerCase().includes(searchQuery.toLowerCase() ) &&  (
                        <MovieCard key={movie.id} movie={movie} />
                        )
                )}
            </div>
        </div>
    );
}

export default Home